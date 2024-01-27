import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes/index.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV || 'development';

const server = async () => {
  try {
    if (mode === 'development') {
      console.log(process.env.PROD_DB, process.env.DEV_DB, 'IN DEVELOPMENT');
      await mongoose.connect(process.env.DEV_DB, {
        useNewUrlParser: true,
      });
    } else if (mode === 'test') {
      console.log(process.env.PROD_DB, process.env.DEV_DB, 'IN TEST');
      await mongoose.connect(process.env.TEST_DB, {
        useNewUrlParser: true,
      });
    } else if (mode === 'production') {
      console.log(process.env.PROD_DB, process.env.DEV_DB, 'IN PRODUCTION');
      await mongoose.connect(process.env.PROD_DB, {
        useNewUrlParser: true,
      });
    }

    app.use(bodyParser.json());
    app.use(
      cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      })
    );
    app.use(morgan('dev'));
    app.use(express.json());
    app.use('/api/', routes);

    app.use('*', (req, res, next) => {
      res.status(404).json({
        error: 'NOT FOUND',
      });
    });
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

server();
