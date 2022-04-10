import { Router } from 'express';
import User from '../schema/User';
import { DynamoMapper } from '../config/dynamo';
import { validate } from 'class-validator';
import { nanoid } from 'nanoid';
import { UserType } from '../schema/enums';

const router = Router();

router.get('/', async (req, res) => {
  const users = [];
  for await (const item of DynamoMapper.scan(User)) {
    users.push(item);
  }
  res.json({ users });
});

router.delete('/:id', async (req, res) => {
  const user = new User();
  Object.assign(user, req.params);
  const result = await DynamoMapper.delete(user);
  res.json(result);
});

router.post('/', async (req, res) => {
  // TEMP: We'll be doing something with an auth / fb token to create users
  const user = new User();
  Object.assign(user, req.body);
  user.id = nanoid();
  if (user.userType === undefined) {
    user.userType = UserType.User;
  }
  await validate(user);
  await DynamoMapper.put(user);
  res.status(201).json(user);
});

export default router;
