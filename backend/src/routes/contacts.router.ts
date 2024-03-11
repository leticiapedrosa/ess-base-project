import express, { Request, Response } from 'express';
import ContactsDatabase from '../database/contacts.database';
//import * as chatsService from '../services/contacts.service';

const router = express.Router();


export default router; // Exportação padrão do router

// Rota para obter lista de contatos
router.get('/', async (req, res, next) => {
    try {
      const contactsDatabase = ContactsDatabase.getInstance();
      const listContacts = contactsDatabase.getAllContacts(); // Método a ser implementado para obter todos os contatos do banco de dados
  
      res.json(listContacts);
    } catch (error) {
      next(error);
    }
  });
  

  // Rota para adicionar um novo contato
  router.post('/', async (req, res, next) => {
    try {
      const newContact = req.body; // O novo contato enviado no corpo da requisição
      
      if (newContact && newContact.name && newContact.number) { // Verifica se o corpo da requisição contém os campos necessários
        const contactsDatabase = ContactsDatabase.getInstance();
        contactsDatabase.addContact(newContact); // Adiciona o novo contato ao banco de dados
  
        res.status(200).json({ message: "Contato adicionado com sucesso" }); // Retorna 200 Created para indicar que o contato foi adicionado com sucesso
      } else {
        res.status(500).json({ message: "Erro ao adicionar contato" }); // Se os campos necessários não estiverem presentes, retorna um erro 400 Bad Request
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar contato" });
      next(error); // Se houver um erro, passe para o próximo middleware de tratamento de erro
    }
  });
  

  // Rota para obter informações de um contato específico
  router.get('/:id/info', async (req, res, next) => {
    try {
      const contactId = req.params.id;
      const contactsDatabase = ContactsDatabase.getInstance();
      const contact = contactsDatabase.getContactById(contactId); // Implemente o método getContactById na classe ContactsDatabase
  
      if (!contact) {
        return res.status(404).json({ message: 'Contato não encontrado' });
      }
      
      res.status(200).json(contact);
    } catch (error) {
      res.status(500)
      next(error);
    }
  });

  
  //Rota para deletar um contato
  router.delete('/:id/info', async (req, res, next) => {
    try {
      const contactId = req.params.id;
      const contactsDatabase = ContactsDatabase.getInstance();
  
      // Verifica se o contato com o ID fornecido existe
      const contactToDelete = contactsDatabase.getContactById(contactId);
      if (contactToDelete) { 
        contactsDatabase.deleteContact(contactId); // Se o contato existir, então deleta
        res.status(200).json({ message: "Você tem certeza que deseja remover este contato?", options: ["Confirmar", "Cancelar"] });
  
      } else {
        return res.status(404).json({ message: 'Contato não encontrado' }); // Se o contato não existir, retorna um erro 404
      }
    } catch (error) {
      res.status(500)
      next(error);
    }
  });


  //realmente deletando
  router.delete('/:id/info/confirm', async (req, res, next) => {
    try {
      const contactId = req.params.id;
      const contactsDatabase = ContactsDatabase.getInstance();
      contactsDatabase.deleteContact(contactId); // Se o contato existir, então deleta
      res.status(200).json({ message: "Contato removido com sucesso" });
    
    } catch (error) {
      res.status(500)
      next(error);
    }
  });


  router.get('/search', async (req, res, next) => {
    try {
        const searchTerm: string = req.query.searchTerm as string;
        const contactsDatabase = ContactsDatabase.getInstance();
        const filteredContacts = contactsDatabase.searchContactByName(searchTerm);

        if (filteredContacts.length >  0) {
            res.status(200).json(filteredContacts);
        } else {
            res.status(404).json({ message: 'Nenhum contato encontrado com o termo de busca fornecido.' });
        }
    } catch (error) {
        res.status(500);
        next(error);
    }
});


