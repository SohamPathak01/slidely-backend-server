import express from 'express';
import * as bodyParser from 'body-parser';
import submissionRoutes from './routes/submissions';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.json({ success: true });
});

app.use('/', submissionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
