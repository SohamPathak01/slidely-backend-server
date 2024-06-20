import express, { Router } from 'express';
import * as fs from 'fs';
//import path from 'path';

const router = express();
const port=3000;
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
  console.log("---submit request----",req.body);
  const { Name, Email, PhoneNum, GithubLink, StopwatchTime } = req.body;
  //print(req<>);

  const db = loadDB();
  db.submissions.push({ Name, Email, PhoneNum, GithubLink, StopwatchTime });
  saveDB(db);

  res.status(200).json({ success: true });
});

// Read route
// router.get('/read', (req, res) => {
//   const index = parseInt(req.query.index as string, 10);

//   const db = loadDB();

//   if (index >= 0 && index < db.submissions.length) {
//     res.json(db.submissions[index]);
//   } else {
//     res.status(404).json({ error: 'Submission not found' });
//   }
// });
router.get('/read', (req, res) => {
  const index = parseInt(req.query.index as string, 10);
  const dbPath = dbFilePath;
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  //console.log(dbPath);
 // console.log(db.submissions);
  
  if (index >= 0 && index < db.submissions.length) {
      //console.log(db.submissions[index]);
      res.json([db.submissions[index]]); // Return as an array
  } else {
      res.status(404).json({ error: 'Index out of bounds' });
  }
});
// router.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

export default router;
