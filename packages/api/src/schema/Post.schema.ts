import {
  attribute,
  autoGeneratedHashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';
import { IndoorOutdoor } from '../types/enum/IndoorOutdoor';
import { User } from '../types/User';

@table('posts')
export class Post {
  @autoGeneratedHashKey()
  id: string;
  
  @rangeKey()
  createdAt: Date;

  @attribute()
  description: string;

  @attribute()
  location: string;

  @attribute()
  startTime: Date;

  @attribute()
  endTime: Date;

  @attribute()
  peopleRequired: number;

  @attribute()
  crcRequired: boolean;

  @attribute()
  indoorOutdoor: IndoorOutdoor;

  @attribute()
  idealVolunteer: string;

  @attribute()
  organizer: User;

  @attribute()
  joiners: Array<User>;
}