import { Router } from 'express';
import { createOrUpdateResume } from '@/core/resume';
import { ENGINEERING_RESUME } from '@/meta/ResumeInterface';
import { Datastore } from '@/database_mongodb/datastore';

let router = Router();

router.put('/internal/resume', (_req, res) => {
  const userId = String(_req.query.userId);
  const tag = String(_req.query.tag);
  const resume = _req.body;
  const schema = _req.query.schema;
  if (schema == 'engineering') {
    let datastore = new Datastore<ENGINEERING_RESUME, string>();
    createOrUpdateResume(userId, tag, resume, datastore);
  }
  res.status(200).send('Resume updated successfully');
});

router.get('resume', (_req, res) => {
  res.send('Welcome to the Native Protocol Backend API');
});

export default router;
