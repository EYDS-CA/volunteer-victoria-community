import { IndoorOutdoor } from './enum/IndoorOutdoor';
import { User } from './User';

export class Post {
  id: string;

  startTime: Date;
  
  endTime: Date;

  peopleRequired: number;

}

export class FullPost {
  createdAt: Date;

  description: string;

  location: string;

  crcRequired: number;

  indoorOutdoor: IndoorOutdoor;

  idealVolunteer: string;

  organizer: User;

  joiners: User[];
}