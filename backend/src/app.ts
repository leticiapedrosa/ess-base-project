import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import logger from './logger';
import setupRoutes from './routes/index';
import { HttpError } from './utils/errors/http.error';
import { FailureResult } from './utils/result';
import contactsRouter from './routes/contacts.router'
import Database from './database';
import userRoutes from './routes/user.route';
import loginRouter from './routes/user_login.route'; 
import updateRouter from './routes/update.route';
import deleteRouter from './routes/delete.user.router';
import chatsRouter from './routes/chats.router';

const app: express.Express = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: '*',
  })
);

setupRoutes(app);

// Adicione as rotas do usuário à aplicação
app.use('/api/users', userRoutes);
app.use('/api/users', loginRouter);
app.use('/api/users', updateRouter); 
app.use('/api/users', deleteRouter); 
app.use('/api/chats', chatsRouter);

app.use('/api/contacts', contactsRouter);

app.use(
  (
    error: HttpError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error.status >= 500) {
      logger.error(error.toString());
    }

    new FailureResult({
      msg: error.msg ?? error.message,
      msgCode: error.msgCode,
      code: error.status,
    }).handle(res);
  }
);

// e.g. Seed database with initial data;
Database.seed();

export default app;
