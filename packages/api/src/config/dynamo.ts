import { DynamoDB } from 'aws-sdk';

const dynamoDBOptions: DynamoDB.ClientConfiguration = {
  region: process.env.AWS_DEFAULT_REGION || 'ca-central-1',
};

if (process.env.AWS_ACCESS_KEY_ID) {
  dynamoDBOptions.credentials['accessKeyId'] = process.env.AWS_ACCESS_KEY_ID;
}
if (process.env.AWS_SECRET_ACCESS_KEY) {
  dynamoDBOptions.credentials['secretAccessKey'] = process.env.AWS_SECRET_ACCESS_KEY;
}
if (process.env.AWS_SESSION_TOKEN) {
  dynamoDBOptions.credentials['sessionToken'] = process.env.AWS_SESSION_TOKEN;
}

dynamoDBOptions.endpoint = process.env.DB_ENDPOINT;
dynamoDBOptions.sslEnabled = false;

export const DynamoClient = new DynamoDB(dynamoDBOptions);