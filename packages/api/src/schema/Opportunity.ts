import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';
import { IndoorOutdoor } from './enums';

@table(process.env.OPPORTUNITY_TABLE_NAME || 'opportunity')
export default class Opportunity {
  @hashKey()
  id: string;

  @attribute()
  creatorUserId: string;

  @attribute()
  contactInfo: {
    name: string;
    phoneNumber: string;
    email: string;
  };

  @attribute()
  name: string;

  @attribute()
  description: string;

  @attribute()
  location: string;

  @attribute()
  peopleRequired: number;

  @attribute()
  startTime: Date;

  @attribute()
  endTime: Date;

  @attribute()
  criminalCheckRequired: boolean;

  @attribute()
  indoorOutdoor: IndoorOutdoor;

  @attribute()
  idealVolunteer: string;

  @attribute()
  additionalInfo: string;
}
