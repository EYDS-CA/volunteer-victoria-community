import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

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

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

const client = new DynamoDB(dynamoDBOptions);

app.get('/', async (req, res) => {
  return res.json({ 'hello': 'world' });
});

app.listen(4000, () => {
  console.log('app started');
});