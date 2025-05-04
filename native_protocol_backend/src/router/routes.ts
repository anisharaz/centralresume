import { Router } from 'express';
import indexRouter from './index';

let routes = Router();

routes.use('/', indexRouter);

export default routes;
