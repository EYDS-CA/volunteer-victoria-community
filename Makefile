-include .env

export $(shell sed 's/=.*//' .env)

export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)

export GIT_LOCAL_BRANCH := $(or $(GIT_LOCAL_BRANCH),dev)
export PROJECT := $(or $(PROJECT),vcc)
export AWS_REGION ?= ca-central-1
ENV_NAME ?= dev
NAMESPACE = $(PROJECT)-$(ENV_NAME)

APP_SRC_BUCKET = $(NAMESPACE)-app

TERRAFORM_DIR = terraform
export BOOTSTRAP_TERRAFORM_DIR=terraform/bootstrap


ifeq ($(ENV_NAME), dev)
DOMAIN=
endif

ifeq ($(ENV_NAME), prod)
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

apply: 
	@terraform -chdir=$(TERRAFORM_DIR) apply -auto-approve -input=false

plan: init
	@terraform -chdir=$(TERRAFORM_DIR) plan

clean-yarn: 
	@rm -rf node_modules
	@yarn

destroy: init
	@terraform -chdir=$(TERRAFORM_DIR) destroy

deploy-api: 
	@aws lambda update-function-code --function-name $(NAMESPACE)-api --zip-file fileb://.build/api.zip

deploy-app:
	aws s3 sync .build/app s3://$(APP_SRC_BUCKET) --delete

deploy-all: deploy-api deploy-app

## Application stack building
pre-build: clean-yarn
	@rm -rf ./packages/api/dist
	@rm -rf .build || true
	@mkdir -p .build

build-api: pre-build
	@echo "Building API for AWS Lambda"
	@yarn workspace api run build
	@yarn workspaces focus api --production
	@cp -r node_modules .build/node_modules
	@rm -rf .build/node_modules/api
	@cp -r ./packages/api/dist/* .build
	@(cd .build; zip -rmq api.zip *)

build-app: pre-build

build-all: build-api build-app

build-and-deploy: build-all deploy-all


#Database
# export DB_CONFIG_NAME := $(or $(DB_CONFIG_NAME),default)
# export DB_CONFIG_TYPE := $(or $(DB_CONFIG_TYPE),postgres)
# export DB_HOST := $(or $(DB_HOST),postgres)
# export DB_PORT := $(or $(DB_PORT),5432)
# export DB_USERNAME := $(or $(DB_USERNAME),vape_nestapi)
# export DB_PASSWORD := $(or $(DB_PASSWORD),vape_nest123)
# export DB_DATABASE := $(or $(DATABASE),nest_api_dev)

####################################################################
## Local Development
####################################################################

run-local:
	@echo "+\n++ Make: Running locally ...\n+"
	@COMPOSE_HTTP_TIMEOUT=200 docker-compose -f docker-compose.dev.yml up

run-local-retailer:
	@echo "+\n++ Make: Running client locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up retailer-app

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
