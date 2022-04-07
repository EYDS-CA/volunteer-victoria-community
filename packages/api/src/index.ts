import express from 'express';

const app = express();

app.get('/', async (req, res) => {
  return res.json({ 'hello': 'world' });
});

app.listen(3000, () => {
  console.log('app started');
});