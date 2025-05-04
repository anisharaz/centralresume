import express from 'express';
import logger from 'morgan';
import { ConfigManager } from './config';
import { authorization, Authorizer } from './middlewares/authorization';
import routes from './router/routes';

const configManager = ConfigManager.getInstance();
const app = express();

app.use(logger('dev'));

app.use('/', routes);

let dummyAuthorizer: Authorizer = { isAuthorized: (req) => true };
app.use(authorization(dummyAuthorizer));

const port = configManager.getConfig().port;
const host = configManager.getConfig().host;
app.listen(port, host, () => {
  console.log(`App listening on port ${host}:${port}`);
});
