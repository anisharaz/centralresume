import { Router } from 'express';
import {
  createResume,
  updateResume,
  getResume,
  getCompleteResume,
} from '@/core/resume';
import { ENGINEERING_RESUME } from '@/meta/ResumeInterface';
import { Datastore } from '@/database-implementation/datastore';

const router = Router();

router.put('/internal/resume', async (_req, res) => {
  const userId = String(_req.query.userId);
  const tag = String(_req.query.tag);
  const resume = _req.body;
  const schema = _req.query.schema;
  if (!userId || !tag || !resume || !schema) {
    res.status(400).send('Missing required parameters');
    return;
  }
  if (schema == 'engineering') {
    const datastore = await Datastore.getInstance();
    updateResume<ENGINEERING_RESUME, Datastore>(userId, tag, resume, datastore);
    res.status(200).send('Resume updated successfully');
    return;
  }
  res.status(400).send('Invalid schema');
});

router.post('/internal/resume', async (_req, res) => {
  const userId = String(_req.query.userId);
  const resume = _req.body;
  const schema = _req.query.schema;
  if (!userId || !resume || !schema) {
    res.status(400).send('Missing required parameters');
    return;
  }
  if (schema == 'engineering') {
    const datastore = await Datastore.getInstance();
    const resumeId = await createResume<ENGINEERING_RESUME, Datastore>(
      userId,
      resume,
      datastore,
    );
    res
      .status(200)
      .send({ message: 'Resume created successfully', id: resumeId });
    return;
  }
  res.status(400).send('Invalid schema');
});

router.get('/internal/resume', async (_req, res) => {
  const userId = String(_req.query.userId);
  const schema = _req.query.schema;
  if (!userId || !schema) {
    res.status(400).send('Missing required parameters');
    return;
  }
  if (schema == 'engineering') {
    const datastore = await Datastore.getInstance();
    const resume = await getCompleteResume<ENGINEERING_RESUME, Datastore>(
      userId,
      datastore,
    );
    res.status(200).send(resume);
  } else {
    res.status(400).send('Invalid schema');
  }
});

router.get('/resume', async (_req, res) => {
  const userId = String(_req.query.userId);
  const tag = String(_req.query.tag);
  const schema = _req.query.schema; //TODO: Not sure what to do with this yet
  if (!userId || !tag || !schema) {
    res.status(400).send('Missing required parameters');
    return;
  }
  if (schema == 'engineering') {
    const datastore = await Datastore.getInstance();
    const resume = await getResume<ENGINEERING_RESUME, Datastore>(
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
