import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import logger from './logger';
import setupRoutes from './routes/index';
import { HttpError } from './utils/errors/http.error';
import { FailureResult } from './utils/result';
import Database from './database';
import ContactsDatabase from './database/contacts.database';

const app: express.Express = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

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

// Rota para adicionar um novo contato
app.post('/api/contacts', async (req, res, next) => {
  try {
    const newContact = req.body; // O novo contato enviado no corpo da requisição
    const contactsDatabase = ContactsDatabase.getInstance();
    contactsDatabase.addContact(newContact); // Adiciona o novo contato ao banco de dados

    res.status(201).json({ message: "Contato adicionado com sucesso" }); // Retorna 201 Created para indicar que o contato foi adicionado com sucesso
  } catch (error) {
    next(error); // Se houver um erro, passe para o próximo middleware de tratamento de erro
  }
});


// Rota para obter informações de um contato específico
app.get('/api/contacts/:id', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contactsDatabase = ContactsDatabase.getInstance();
    const contact = contactsDatabase.getContactById(contactId); // Implemente o método getContactById na classe ContactsDatabase

    if (!contact) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

//Rota para deletar um contato
app.delete('/api/contacts/delete/:id', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contactsDatabase = ContactsDatabase.getInstance();
    contactsDatabase.deleteContact(contactId); // Chama o método deleteContact passando o ID do contato a ser deletado
    contactsDatabase.deleteContact(contactId);

    res.status(204).json({msg:"Contato deletado com sucesso." }); // Retorna 204 No Content para indicar que o contato foi deletado com sucesso
  } catch (error) {
    res.status(500).json({msg: "Falha ao deletar o contato." });
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
