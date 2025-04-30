import express from 'express';
import logger from 'morgan';
import { ConfigManager } from './config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const configManager = ConfigManager.getInstance();
const port = configManager.getConfig().port;
const host = configManager.getConfig().host;

const app = express();
app.use(logger('dev'));

app.get('/', (_req, res) => {
  prisma.user.findMany().then((users) => {
    res.send(JSON.stringify(users));
  });
});

app.listen(port, host, () => {
  console.log(`Example app listening on port ${host}:${port}`);
});
