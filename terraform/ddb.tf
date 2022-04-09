
resource "aws_dynamodb_table" "users" {
  name           = local.users_table
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  range_key      = "createdAt"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "posts" {
  name           = local.posts_table
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  range_key      = "createdAt"

  attribute {
    name = "id"
    type = "S"
  }
}
