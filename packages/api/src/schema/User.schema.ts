import {
  attribute,
  autoGeneratedHashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';
import { Post } from '../types/Post';
import { UserTypeEnum } from '../types/enum/UserType';

@table('users')
export class User {
  @autoGeneratedHashKey()
  id: string;
  
  @attribute()
  createdAt: Date;

  @attribute()
  firstName: string;

  @attribute()
  lastName: string;

  @rangeKey()
  @attribute()
  facebookId: string;

  @attribute()
  phoneNumber: string;

  @attribute()
  email: string;

  @attribute()
  userType: UserTypeEnum;

  @attribute()
  recentCRC: boolean;

  @attribute()
  confirmedAttending: Array<Post>;
}