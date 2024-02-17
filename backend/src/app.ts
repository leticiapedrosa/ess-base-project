import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import logger from './logger';
import setupRoutes from './routes/index';
import { HttpError } from './utils/errors/http.error';
import { FailureResult } from './utils/result';
import Database from './database';
import ContactsDatabase from './database/contacts.database';

const app: express.Express = express();
app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

setupRoutes(app);


// Rota para obter lista de contatos
app.get('/api/contacts', async (req, res, next) => {
  try {
    const contactsDatabase = ContactsDatabase.getInstance();
    const listContacts = contactsDatabase.getAllContacts(); // Método a ser implementado para obter todos os contatos do banco de dados

    res.json(listContacts);
  } catch (error) {
    next(error);
  }
});

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
