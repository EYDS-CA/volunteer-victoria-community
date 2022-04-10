import express from 'express';
import { DynamoMapper } from '../config/dynamo';
import Opportunity from '../schema/Opportunity';
import { nanoid } from 'nanoid';
import { validate } from 'class-validator';
import Applicant from '../schema/Applicant';

const router = express.Router();

router.get('/', async (req, res) => {
  const opps = []
  for await (const opp of DynamoMapper.scan(Opportunity)) {
    opps.push(opp)
  }
  res.json({ opportunities: opps });
});

router.post('/', async (req, res) => {
  const opp = new Opportunity();
  Object.assign(opp, req.body)
  opp.id = nanoid();
  await validate(opp);
  const result = await DynamoMapper.put(opp);
  res.status(201).json(result);
});

router.delete('/:id', async (req, res) => {
  const opp = new Opportunity();
  Object.assign(opp, req.params);
  const result = await DynamoMapper.delete(opp);
  res.json(result);
});

router.get('/:id/applicant', async (req, res) => {
  const { id } = req.params;
  const apps = [];
  for await (const app of DynamoMapper.query(Applicant, { opportunityId: id })) {
    apps.push(app);
  }
  res.json({ applicants: apps })
});

router.put('/:id/applicant/:userId', async (req, res) => {
  const { id, userId } = req.params;
  const app = new Applicant();
  app.opportunityId = id;
  app.userId = userId;
  Object.assign(app, req.body);
  await validate(app);
  const result = await DynamoMapper.put(app);
  res.json(result);
});

router.delete('/:opportunityId/applicant/:userId', async (req, res) => {
  const app = new Applicant();
  Object.assign(app, req.params);
  const result = await DynamoMapper.delete(app);
  res.json(result);
});

export default router;
