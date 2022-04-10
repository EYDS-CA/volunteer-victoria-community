
resource "aws_dynamodb_table" "user" {
  name           = local.user_table
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "opportunity" {
  name           = local.opportunity_table
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "applicant" {
  name           = local.applicant_table
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "opportunityId"
  range_key      = "userId"

  attribute {
    name = "opportunityId"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }
}
