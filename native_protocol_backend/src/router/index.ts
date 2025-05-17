import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send('Welcome to the Native Protocol Backend API');
});

export default router;
