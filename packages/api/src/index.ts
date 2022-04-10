import { DynamoMapper } from './config/dynamo';
import app from './app'
import User from './schema/User';
import Opportunity from './schema/Opportunity';
import Applicant from './schema/Applicant';

app.listen(4000, async () => {
  console.log('app started');

  const capacity = {
    readCapacityUnits: 5,
    writeCapacityUnits: 5,
  }

  for (const table of [User, Opportunity, Applicant]) {
    await DynamoMapper.ensureTableExists(table, capacity);
  }
});
