import express from 'express';
import logger from 'morgan';
import { ConfigManager } from './config';
import { authorization, Authorizer } from './middlewares/authorization';
import routes from './router/routes';
import { Datastore } from './database-implementation/datastore';

const configManager = ConfigManager.getInstance();
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/', routes);

const RouteAuthorizer: Authorizer = {
  isAuthorized: async (req) => {
    // The /v1/internal path is used for internal microservice communication
    // which is blocked for external request by nginx.
    if (req.path.startsWith('/v1/internal')) return true;
    const auth_header = req.headers['authorization']?.split(' ');
    if (auth_header?.length !== 2) return false;
    const [auth_type, auth_token] = auth_header;
    if (auth_type !== 'Bearer') return false;
    const datastore = await Datastore.getInstance();
    return datastore.isValidToken(auth_token);
  },
};
app.use(authorization(RouteAuthorizer));

const port = configManager.getConfig().port;
const host = configManager.getConfig().host;
app.listen(port, host, () => {
  console.log(`App listening on port ${host}:${port}`);
});
