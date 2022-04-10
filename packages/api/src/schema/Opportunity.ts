import {
  attribute,
  hashKey,
  table
} from '@aws/dynamodb-data-mapper-annotations';
import { IsDefined, IsEnum, IsInt, IsISO8601, IsOptional, Min } from 'class-validator';
import { IndoorOutdoor } from './enums';

@table(process.env.OPPORTUNITY_TABLE_NAME || 'opportunity')
export default class Opportunity {
  @hashKey()
  @IsDefined()
  id: string;

  @attribute()
  @IsDefined()
  creatorUserId: string;

  @IsDefined()
  @attribute()
  contactName: string;
  
  @attribute()
  @IsOptional()
  contactPhoneNumber?: string;

  @attribute()
  @IsOptional()
  contactEmail?: string;

  @attribute()
  @IsDefined()
  opportunityName: string;

  @attribute()
  @IsDefined()
  description: string;

  @attribute()
  @IsDefined()
  location: string;

  @attribute()
  @Min(0)
  @IsInt()
  peopleRequired: number;

  @attribute()
  @IsISO8601()
  @IsDefined()
  startTime: string;

  @attribute()
  @IsISO8601()
  @IsDefined()
  endTime: Date;

  @attribute()
  @IsDefined()
  criminalCheckRequired: boolean;

  @attribute()
  @IsEnum(IndoorOutdoor)
  @IsOptional()
  indoorOutdoor?: IndoorOutdoor;

  @attribute()
  @IsOptional()
  idealVolunteer?: string;

  @attribute()
  @IsOptional()
  additionalInfo?: string;
}
