import { Router } from 'express';
import {
  createResume,
  updateResume,
  getResume,
  getCompleteResume,
} from '@/core/resume';
import { RESUME } from '@/meta/ResumeInterface';
import { Datastore } from '@/database-implementation/datastore';

const router = Router();

router.put('/internal/resume', async (_req, res) => {
  const userId = String(_req.query.userId);
  const resume = _req.body;
  if (!userId || !resume) {
    res.status(400).send('Missing required parameters');
    return;
  }
  const datastore = await Datastore.getInstance();
  await updateResume<RESUME, Datastore>(userId, resume, datastore);
  res.status(200).send('Resume updated successfully');
  return;
});

router.post('/internal/resume', async (_req, res) => {
  const userId = String(_req.query.userId);
  const resume = _req.body;
  if (!userId || !resume) {
    res.status(400).send('Missing required parameters');
    return;
  }
  const datastore = await Datastore.getInstance();
  const resumeId = await createResume<RESUME, Datastore>(
    userId,
    resume,
    datastore,
  );
  res
    .status(200)
    .send({ message: 'Resume created successfully', id: resumeId });
  return;
});

router.get('/internal/resume', async (_req, res) => {
  const userId = String(_req.query.userId);
  if (!userId) {
    res.status(400).send('Missing required parameters');
    return;
  }
  const datastore = await Datastore.getInstance();
  const resume = await getCompleteResume<RESUME, Datastore>(userId, datastore);
  res.status(200).send(resume);
});

router.get('/resume', async (_req, res) => {
  const userId = String(_req.query.userId);
  const tag = String(_req.query.tag);
  if (!userId || !tag) {
    res.status(400).send('Missing required parameters');
    return;
  }
  const datastore = await Datastore.getInstance();
  const resume = await getResume<RESUME, Datastore>(userId, tag, datastore);
  res.status(200).send(resume);
});

export default router;
