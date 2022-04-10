import { Router } from 'express';
import User from '../schema/User';
import { DynamoMapper } from '../config/dynamo';
import { UserType } from '../schema/enums';
import { nanoid } from 'nanoid';

const router = Router();

router.get('/', async (req, res) => {
  const users = [];
  for await (const item of DynamoMapper.scan(User)) {
    users.push(item);
  }
  res.json({ users });
});

router.post('/', async (req, res) => {
  // TEMP: We'll be doing something with an auth / fb token to create users
  // so we can ignore validation for now
  const user = new User();
  Object.assign(user, req.body)
  user.id = nanoid()
  await DynamoMapper.put(user);
  res.status(201).json(user);
});

export default router;
