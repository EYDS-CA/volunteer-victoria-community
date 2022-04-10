import {
  attribute, hashKey,
  table
} from '@aws/dynamodb-data-mapper-annotations';
import { IsDefined, IsEnum, IsOptional } from 'class-validator';
import { UserType } from './enums';

@table(process.env.USER_TABLE_NAME || 'user')
export default class User {
  @hashKey()
  @IsDefined()
  id: string;

  @attribute()
  @IsDefined()
  facebookId: string;

  @attribute()
  @IsDefined()
  name: string;

  @attribute()
  @IsOptional()
  phoneNumber?: string;

  @attribute()
  @IsOptional()
  email?: string;

  @attribute()
  @IsEnum(UserType)
  @IsDefined()
  userType: UserType;
}
