import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';
import FBStrategy from 'passport-facebook-token';
import { nanoid } from 'nanoid';
import { ConditionExpression } from '@aws/dynamodb-expressions';

import UserRoutes from './routes/user';
import OpportunityRoutes from './routes/opportunity';
import { DynamoMapper } from './config/dynamo';
import User from './schema/User';
import Opportunity from './schema/Opportunity';
import Applicant from './schema/Applicant';
import { UserType } from './schema/enums';
import { validate } from 'class-validator';

export async function initDevTables(): Promise<void> {
  const capacity = {
    readCapacityUnits: 5,
    writeCapacityUnits: 5,
  }
  for (const table of [User, Opportunity, Applicant]) {
    await DynamoMapper.ensureTableExists(table, capacity);
  }
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.use(
  new FBStrategy({
    clientID: '562027152004706',
    clientSecret: '9c35f2a3ffe948a91f3e2c31faca89c3',
  }, async (at, rt, profile, done) => {
    const filter: ConditionExpression = {
      type: 'Equals',
      subject: 'facebookId',
      object: profile.id,
    };
    const scan = await DynamoMapper.scan(User, { filter });
    // TODO: There's probably a better way to do this.. can we make facebookId the key?
    let users: User[] = [];
    for await (const user of scan) {
      users.push(user);
    }
    if (users.length === 0) {
      const newUser = new User();
      newUser.id = nanoid();
      newUser.facebookId = profile.id;
      newUser.name = `${profile.name.givenName} ${profile.name.familyName}`;
      newUser.email = profile.emails[0].value;
      newUser.userType = UserType.User;
      await validate(newUser);
      await DynamoMapper.put(newUser);
      return done(null, newUser);
    } else {
      return done(null, users[0]);
    }
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export const apiBaseUrl = '/api/v1';

app.get(apiBaseUrl, async (req, res) => {
  return res.json({ 'hello': 'world' });
});

app.use(`${apiBaseUrl}/user`, passport.authenticate('facebook-token'), UserRoutes);
app.use(`${apiBaseUrl}/opportunity`, passport.authenticate('facebook-token'), OpportunityRoutes);

export default app;
