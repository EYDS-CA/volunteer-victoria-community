import { attribute, hashKey, rangeKey, table } from "@aws/dynamodb-data-mapper-annotations";
import { IsDefined, IsOptional } from "class-validator";

@table(process.env.APPLICANT_TABLE_NAME || 'applicant')
export default class Applicant { 
  @hashKey()
  @IsDefined()
  opportunityId: string;

  @rangeKey()
  @IsDefined()
  userId: string;

  @attribute()
  @IsDefined()
  attended: boolean;

  @attribute()
  @IsOptional()
  notes?: string;
}
