import express from 'express';
import { DynamoMapper } from '../config/dynamo';
import Opportunity from '../schema/Opportunity';

const router = express.Router();

router.get('/', async (req, res) => {
  const opportunities = []
  for await (const opp of DynamoMapper.scan(Opportunity)) {
    opportunities.push(opp)
  }
  res.json({ opportunities });
});

export default router;
