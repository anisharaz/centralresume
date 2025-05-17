import { Router } from 'express';
import indexRouter from './index';

const routes = Router();

routes.use('/', indexRouter);

export default routes;
