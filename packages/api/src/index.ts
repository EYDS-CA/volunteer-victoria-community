import app, { initDevTables } from './app';

app.listen(4000, async () => {
  console.log('app started');
  await initDevTables();
});
