import { Router } from 'express';
import * as fs from 'fs';

const router = Router();

const dbFilePath = './db.json';

// Load the database
const loadDB = () => {
  if (fs.existsSync(dbFilePath)) {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  }
  return { submissions: [] };
};

// Save the database
const saveDB = (db: any) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), 'utf8');
};

// Submit route
router.post('/submit', (req, res) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  const db = loadDB();
  db.submissions.push({ name, email, phone, github_link, stopwatch_time });
  saveDB(db);

  res.status(201).json({ success: true });
});

// Read route
router.get('/read', (req, res) => {
  const index = parseInt(req.query.index as string, 10);

  const db = loadDB();

  if (index >= 0 && index < db.submissions.length) {
    res.json(db.submissions[index]);
  } else {
    res.status(404).json({ error: 'Submission not found' });
  }
});

export default router;
