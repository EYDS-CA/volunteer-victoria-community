import { table, attribute, hashKey, rangeKey } from "@aws/dynamodb-data-mapper-annotations";

@table(process.env.APPLICANT_TABLE_NAME || 'applicant')
export default class Applicant { 
  @hashKey()
  opportunityId: string;

  @rangeKey()
  userId: string;

  @attribute()
  attended: boolean;

  @attribute()
  notes: string;
}
