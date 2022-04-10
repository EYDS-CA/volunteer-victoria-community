import {
  attribute, hashKey,
  table
} from '@aws/dynamodb-data-mapper-annotations';
import { UserType } from './enums';

@table(process.env.USER_TABLE_NAME || 'user')
export default class User {
  @hashKey()
  id: string;

  @attribute()
  facebookId: string;

  @attribute()
  name: string;

  @attribute()
  phoneNumber?: string;

  @attribute()
  email?: string;

  @attribute()
  userType: UserType;
}
