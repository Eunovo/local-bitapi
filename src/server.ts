import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './router';
import { requestLoggerMiddleware, errorLoggerMiddleware } from './logging-middleware';

const app = express();

app.use(requestLoggerMiddleware);
app.use(errorLoggerMiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

export { app };
