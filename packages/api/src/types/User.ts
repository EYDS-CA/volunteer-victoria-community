import { UserTypeEnum } from './enum/UserType';

export class User {
  id: string;

  firstName: string;

  lastName: string;

  phoneNumber: string;

  email: string;
}

export class FullUser extends User {
  createdAt: Date;

  facebookId: string;
  
  userType: UserTypeEnum;

  recentCRC: boolean;
}