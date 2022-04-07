-include .env

export $(shell sed 's/=.*//' .env)

export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)

export GIT_LOCAL_BRANCH := $(or $(GIT_LOCAL_BRANCH),dev)
export PROJECT := $(or $(PROJECT),VCC)

#Database
# export DB_CONFIG_NAME := $(or $(DB_CONFIG_NAME),default)
# export DB_CONFIG_TYPE := $(or $(DB_CONFIG_TYPE),postgres)
# export DB_HOST := $(or $(DB_HOST),postgres)
# export DB_PORT := $(or $(DB_PORT),5432)
# export DB_USERNAME := $(or $(DB_USERNAME),vape_nestapi)
# export DB_PASSWORD := $(or $(DB_PASSWORD),vape_nest123)
# export DB_DATABASE := $(or $(DATABASE),nest_api_dev)


####################################################################
## Status Output
####################################################################

print-status:
	@echo " +---------------------------------------------------------+ "
	@echo " | Current Settings                                        | "
	@echo " +---------------------------------------------------------+ "
	@echo " | GIT LOCAL BRANCH: $(GIT_LOCAL_BRANCH) "
	@echo " | PROJECT: $(PROJECT) "
	@echo " | DB_TYPE: $(DB_TYPE) "
	@echo " | DB_HOST: $(DB_HOST) "
	@echo " | DB_PORT: $(DB_PORT) "
	@echo " | DB_USERNAME: $(DB_USERNAME) "
	@echo " | DATABASE: $(DATABASE) "
	@echo " +---------------------------------------------------------+ "

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

package-build:
	@echo "+\n++ Building + Packaging app for deployment"
	.build/package-app.sh
