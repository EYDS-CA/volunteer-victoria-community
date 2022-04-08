import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import UserRoutes from './routes/user.routes';
import PostRoutes from './routes/post.routes';
import { DynamoClient } from './config/dynamo';

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

const apiBaseUrl = '/api/v1';

app.get('/', async (req, res) => {
  return res.json({ 'hello': 'world' });
});

app.use(`${apiBaseUrl}/users`, UserRoutes);
app.use(`${apiBaseUrl}/posts`, PostRoutes);

app.listen(4000, () => {
  console.log('app started');
});

export default app;