import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import caseRoutes from './routes/caseRoutes';
import './cron/cronJob';

dotenv.config();
console.log("Env" + process.env.SMTP_USER)

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', caseRoutes);

app.get('/', (req, res) => {
  res.send('Monkeypox API is running');
});

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
