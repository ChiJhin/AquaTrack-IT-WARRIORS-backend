import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


const app = express();
dotenv.config();
// mongoose
//   .connect(...!)
//   .then(() => console.log('Database connection successful'))
//   .catch(error => {
//     console.log(error.message);
//     process.exit(1);
//   });

app.use(morgan('tiny'));

app.use(cors());
app.use(express.json());

const pathPrefix = '/api';

app.use('/users',);

app.use(`${pathPrefix}/contacts`,);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const port = +process.env.PORT|| 3000 ;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
