import express from 'express';

import { User } from '../schema/User.schema';
import { DynamoMapper } from '../config/dynamo';
import { UserTypeEnum } from '../types/enum/UserType';
import { getUsers, saveUser } from '../services/user.service';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await getUsers();
  res.status(200).json({ users });
});

router.post('/', async (req, res) => {
  // TEMP: We'll be doing something with an auth / fb token to create users
  const user = new User();
  user.createdAt = new Date();
  user.firstName = 'First';
  user.lastName = 'Name';
  user.facebookId = 'abc12345';
  user.phoneNumber = '2508846286';
  user.email = 'web@freshworks.io';
  user.userType = UserTypeEnum.Admin;
  user.recentCRC = true;

  await saveUser(user);

  res.status(200).json({});
});

export default router;