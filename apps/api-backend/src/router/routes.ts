import { Router } from 'express';
import indexRouter from './index';
import resumeRouter from './v1/resume';

const routes = Router();

routes.use('/', indexRouter);
routes.use('/v1', resumeRouter);

export default routes;
