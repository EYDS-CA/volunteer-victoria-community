-include .env

export $(shell sed 's/=.*//' .env)

export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)

export GIT_LOCAL_BRANCH := $(or $(GIT_LOCAL_BRANCH),dev)
export PROJECT := $(or $(PROJECT),vcc)
export AWS_REGION ?= ca-central-1
ENV_NAME ?= dev
NAMESPACE = $(PROJECT)-$(ENV_NAME)
APP_DIR = ./packages/front_end/app
REACT_APP_FACEBOOK_APP_ID = 562027152004706

APP_SRC_BUCKET = $(NAMESPACE)-app

TERRAFORM_DIR = terraform
export BOOTSTRAP_TERRAFORM_DIR=terraform/bootstrap

ifeq ($(ENV_NAME), dev)
CLOUDFRONT_ID=E56FX4WYZRCGQ
DOMAIN=dev.vvc.freshworks.club
endif

ifeq ($(ENV_NAME), prod)
CLOUDFRONT_ID=
DOMAIN=
endif

define TFVARS_DATA
target_env = "$(ENV_NAME)"
project_code = "$(PROJECT)"
api_artifact = "build/api.zip"
app_sources = "build/app"
app_sources_bucket = "$(APP_SRC_BUCKET)"
domain = "$(DOMAIN)"
endef
export TFVARS_DATA

define TF_BACKEND_CFG
region="$(AWS_REGION)"
bucket="$(NAMESPACE)-tf-state"
dynamodb_table="$(NAMESPACE)-tf-lock"
endef
export TF_BACKEND_CFG

# ============================================================= #
# Creating tags to trigger deployment
# ============================================================= #

tag-dev:
ifdef comment
	@git tag -fa dev -m "Deploy dev: $(comment)"
else
	@git tag -fa dev -m "Deploy dev: $(git rev-parse --abbrev-ref HEAD)"
endif
	@git push --force origin refs/tags/dev:refs/tags/dev

# ============================================================= #
# Terraform automation
# ============================================================= #

print-env:
	@echo NAMESPACE=$(NAMESPACE)
	@echo AWS_SA_ROLE_ARN=$(AWS_SA_ROLE_ARN)
	@echo
	@echo ./$(TERRAFORM_DIR)/.auto.tfvars:
	@echo "$$TFVARS_DATA"
	@echo
	@echo ./$(TERRAFORM_DIR)/backend.hcl:
	@echo "$$TF_BACKEND_CFG"

bootstrap:
	## Set-up a S3 bucket for storing terraform state.
	## Only needs to be run once per environment, globally.
	terraform -chdir=$(BOOTSTRAP_TERRAFORM_DIR) init -input=false -reconfigure \
-backend-config='path=$(ENV_NAME).tfstate'
	terraform -chdir=$(BOOTSTRAP_TERRAFORM_DIR) apply -auto-approve -input=false \
		-var='namespace=$(NAMESPACE)'

write-config-tf:
	@echo "$$TFVARS_DATA" > $(TERRAFORM_DIR)/.auto.tfvars
	@echo "$$TF_BACKEND_CFG" > $(TERRAFORM_DIR)/backend.hcl

init: write-config-tf
	@terraform -chdir=$(TERRAFORM_DIR) init -input=false -reconfigure -backend-config=backend.hcl

deploy-tf: init
	@terraform -chdir=$(TERRAFORM_DIR) apply -auto-approve -input=false

plan: init
	@terraform -chdir=$(TERRAFORM_DIR) plan

destroy: init
	@terraform -chdir=$(TERRAFORM_DIR) destroy

deploy-app:
	@aws s3 sync $(APP_DIR)/build s3://$(APP_SRC_BUCKET) --delete
	@aws --region $(AWS_REGION) cloudfront create-invalidation --distribution-id $(CLOUDFRONT_ID) --paths "/*"

deploy-all: deploy-tf deploy-app

## Application stack building
clean: 
	@rm -rf node_modules
	@yarn
	@rm -rf ./packages/api/dist
	@rm -rf terraform/build || true
	@mkdir -p terraform/build

build-api:
	@echo "Building API for AWS Lambda"
	@yarn workspaces focus api
	@yarn workspace api run build
	@yarn workspaces focus api --production
	@cp -r node_modules terraform/build/node_modules
	@rm -rf terraform/build/node_modules/api
	@cp -r ./packages/api/dist/* terraform/build
	@(cd terraform/build; zip -rmq api.zip *)

build-app:
	@yarn workspaces focus app
	@yarn workspace app build

build-all: pre-build build-api build-app

build-and-deploy: build-all deploy-all


####################################################################
## Local Development
####################################################################

run-local:
	@echo "+\n++ Make: Running locally ...\n+"
	@COMPOSE_HTTP_TIMEOUT=200 docker-compose -f docker-compose.yml up

run-local-api:
	@echo "+\n++ Make: Running api locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up application

run-local-server:
	@echo "+\n++ Make: Running api and database locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up application postgres

close-local:
	@echo "+\n++ Make Closing local containers"
	@docker-compose -f docker-compose.dev.yml down

build-local:
	@echo "+\n++ Make: rebuilding and runing docker-compose"
	@docker-compose -f docker-compose.dev.yml up --build

create-localhost-cert:
	@echo "Assumes you have mkcert installed"
	@mkdir -p $(APP_DIR)/.cert
	@mkcert -key-file $(APP_DIR)/.cert/key.pem -cert-file $(APP_DIR)/.cert/cert.pem "localhost"
