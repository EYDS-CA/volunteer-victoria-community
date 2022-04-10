import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import UserRoutes from './routes/user';
import OpportunityRoutes from './routes/opportunity';
import { DynamoMapper } from './config/dynamo';
import User from './schema/User';
import Opportunity from './schema/Opportunity';
import Applicant from './schema/Applicant';

export async function initDevTables(): Promise<void> {
  const capacity = {
    readCapacityUnits: 5,
    writeCapacityUnits: 5,
  }
  for (const table of [User, Opportunity, Applicant]) {
    await DynamoMapper.ensureTableExists(table, capacity);
  }
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

export const apiBaseUrl = '/api/v1';

app.get(apiBaseUrl, async (req, res) => {
  return res.json({ 'hello': 'world' });
});

app.use(`${apiBaseUrl}/user`, UserRoutes);
app.use(`${apiBaseUrl}/opportunity`, OpportunityRoutes);

export default app;
