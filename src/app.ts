import 'reflect-metadata';
import express, { Request, Response, NextFunction, response } from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/error.middleware';
import { router } from './routes';
import logger from './usefulness/Logger';

const pinoHttp = require('pino-http')(logger);

const app = express();
app.use(express.json());
app.use(errorMiddleware);
app.use(pinoHttp);
app.use(router);

export { app };