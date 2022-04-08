import { DynamoMapper } from '../config/dynamo';
import { User } from '../schema/User.schema';

export const getUsers = async () => {
  const users = [];
  for await (const item of DynamoMapper.scan(User)) {
    users.push(item);
  }
  return users;
}

export const saveUser = async (user: User) => {
  await DynamoMapper.put(user);
  return;
}