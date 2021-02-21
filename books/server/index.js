import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import bookRoutes from './routes/books.js';
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/books', bookRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the backend => now go to /books');
})
//mongodb
const CONNECTION_URL = 'mongodb+srv://rahobyat:rahobyat@cluster0.burhh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

  //maybe delete? idk
  mongoose.set('useFindAndModify', false);
