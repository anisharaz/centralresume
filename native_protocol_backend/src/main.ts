import express from 'express';
import logger from 'morgan';
import { ConfigManager } from './config';

const configManager = ConfigManager.getInstance();
const port = configManager.getConfig().port;
const host = configManager.getConfig().host;

const app = express();
app.use(logger('dev'));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, host, () => {
  console.log(`Example app listening on port ${host}:${port}`);
});
