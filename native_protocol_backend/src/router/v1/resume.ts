import { Router } from 'express';
import { createOrUpdateResume, getResume } from '@/core/resume';
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
  const userId = String(_req.query.userId);
  const tag = String(_req.query.tag);
  const schema = _req.query.schema; //TODO: Not sure what to do with this yet
  if (schema == 'engineering') {
    let datastore = new Datastore<ENGINEERING_RESUME, string>();
    const resume = getResume(userId, tag, datastore);
    res.status(200).send(resume);
  } else {
    res.status(400).send('Invalid schema');
  }
});

export default router;
