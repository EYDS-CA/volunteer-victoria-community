resource "aws_s3_bucket" "bucket_logs" {
  bucket = "${local.namespace}-bucket-logs"
}

resource "aws_s3_bucket_acl" "bucket_logs" {
  bucket = aws_s3_bucket.bucket_logs.id
  acl    = "log-delivery-write"
}

resource "aws_s3_bucket" "app" {
  bucket = var.app_sources_bucket
}

resource "aws_s3_bucket_acl" "app" {
  bucket = aws_s3_bucket.app.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "app_versioning" {
  bucket = aws_s3_bucket.app.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_logging" "app" {
  bucket = aws_s3_bucket.app.id

  target_bucket = aws_s3_bucket.bucket_logs.id
  target_prefix = "${var.app_sources_bucket}/"
}


resource "aws_s3_bucket_policy" "app" {
  bucket = aws_s3_bucket.app.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.app.arn}/*"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.app.iam_arn
        }
      },
      {
        Effect   = "Allow"
        Action   = "s3:ListBucket"
        Resource = aws_s3_bucket.app.arn
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.app.iam_arn
        }
      }
    ]
  })
}