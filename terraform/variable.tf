variable "project_code" {}
variable "app_sources" {}
variable "api_artifact" {}
variable "target_env" {}
variable "domain" {}
variable "app_sources_bucket" {}

variable "function_memory_mb" {
  default = "1024"
}

variable "region" {
  default = "ca-central-1"
}
