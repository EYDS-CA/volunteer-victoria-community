import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import UserRoutes from './routes/user.routes';
import PostRoutes from './routes/post.routes';
import { DynamoMapper } from './config/dynamo';
import { User } from './schema/User.schema';
import { Post } from './schema/Post.schema';

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

export default app;