import { Request } from 'express';
import { UserType } from '../schema/enums';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    name: string;
    userType: UserType;
    phoneNumber?: string;
    email?: string;
  }
}