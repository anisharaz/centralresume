import express from 'express';
import logger from 'morgan';
import { ConfigManager } from './config';
import { authorization, Authorizer } from './middlewares/authorization';
import routes from './router/routes';
import { Datastore } from './database_mongodb/datastore';

const configManager = ConfigManager.getInstance();
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/', routes);

const RouteAuthorizer: Authorizer = {
  isAuthorized: (req) => {
    if (req.path.startsWith('/internal')) return true;

    const auth_header = req.headers['authorization']?.split(' ');
    if (auth_header?.length !== 2) return false;
    const [auth_type, auth_token] = auth_header;
    if (auth_type !== 'Bearer') return false;
    return Datastore.getInstance().isValidToken(auth_token);
  },
};
app.use(authorization(RouteAuthorizer));

const port = configManager.getConfig().port;
const host = configManager.getConfig().host;
app.listen(port, host, () => {
  console.log(`App listening on port ${host}:${port}`);
});
