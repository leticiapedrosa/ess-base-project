import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import logger from './logger';
import setupRoutes from './routes/index';
import { HttpError } from './utils/errors/http.error';
import { FailureResult, SuccessResult } from './utils/result';
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
    
    if (newContact && newContact.name && newContact.number) { // Verifica se o corpo da requisição contém os campos necessários
      const contactsDatabase = ContactsDatabase.getInstance();
      contactsDatabase.addContact(newContact); // Adiciona o novo contato ao banco de dados

      res.status(201).json({ message: "Contato adicionado com sucesso" }); // Retorna 201 Created para indicar que o contato foi adicionado com sucesso
    } else {
      res.status(400).json({ message: "Erro ao adicionar contato" }); // Se os campos necessários não estiverem presentes, retorna um erro 400 Bad Request
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar contato" });
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

    // Verifica se o contato com o ID fornecido existe
    const contactToDelete = contactsDatabase.getContactById(contactId);
    if (contactToDelete) { 
      contactsDatabase.deleteContact(contactId); // Se o contato existir, então deleta
      res.status(201).json({ message: "Contato removido com sucesso" });

    } else {
      return res.status(404).json({ message: 'Contato não encontrado' }); // Se o contato não existir, retorna um erro 404
    }
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
