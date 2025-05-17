import { Router } from 'express';
import { createOrUpdateResume, getResume } from '@/core/resume';
import { ENGINEERING_RESUME } from '@/meta/ResumeInterface';
import { Datastore } from '@/database_mongodb/datastore';

const router = Router();

router.put('/internal/resume', async (_req, res) => {
  const userId = String(_req.query.userId);
  const tag = String(_req.query.tag);
  const resume = _req.body;
  const schema = _req.query.schema;
  if (schema == 'engineering') {
    const datastore = await Datastore.getInstance();
    createOrUpdateResume<ENGINEERING_RESUME, Datastore>(
      userId,
      tag,
      resume,
      datastore,
    );
  }
  res.status(200).send('Resume updated successfully');
});

router.get('resume', async (_req, res) => {
  const userId = String(_req.query.userId);
  const tag = String(_req.query.tag);
  const schema = _req.query.schema; //TODO: Not sure what to do with this yet
  if (schema == 'engineering') {
    const datastore = await Datastore.getInstance();
    const resume = getResume<ENGINEERING_RESUME, Datastore>(
      userId,
      tag,
      datastore,
    );
    res.status(200).send(resume);
  } else {
    res.status(400).send('Invalid schema');
  }
});

export default router;
