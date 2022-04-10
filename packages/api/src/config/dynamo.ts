import { DynamoDB } from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';

const dynamoDBOptions: DynamoDB.ClientConfiguration = {
  region: process.env.AWS_REGION || 'ca-central-1',
};

if (process.env.NODE_ENV === 'production') {
  dynamoDBOptions.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
  }
} else {
  dynamoDBOptions.endpoint = 'localhost:4566';
  dynamoDBOptions.sslEnabled = false;
  dynamoDBOptions.credentials = {
    accessKeyId: 'x',
    secretAccessKey: 'x',
  };
  console.log('Connecting to localstack dynamodb');
  console.dir(dynamoDBOptions);
}

export const DynamoClient = new DynamoDB(dynamoDBOptions);
export const DynamoMapper = new DataMapper({ client: DynamoClient });
