import serverlessExpress from '@vendia/serverless-express';

import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Callback } from 'aws-lambda';
import app from './app';

const routes = serverlessExpress({ app });

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): Promise<APIGatewayProxyResult> {
  return routes(event, context, callback);
}
