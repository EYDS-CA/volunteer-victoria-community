import { DynamoDB } from 'aws-sdk';

const dynamoDBOptions: DynamoDB.ClientConfiguration = {
  region: 'ca-central-1',
};

dynamoDBOptions.endpoint = 'localstack:4566';
dynamoDBOptions.sslEnabled = false;
dynamoDBOptions.credentials = {
  accessKeyId: 'x',
  secretAccessKey: 'x',
};

export const DynamoClient = new DynamoDB(dynamoDBOptions);