// contacts.steps.ts
import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import ContactsDatabase from '../../src/database/contacts.database'; 
import { Icontact } from '../../src/interfaces/contacts.interface';

const request = supertest(app);
const feature = loadFeature('tests/features/contacts.feature');

defineFeature(feature, test => {

    let response: supertest.Response;
    test('Obter a lista de contatos', ({ given, and, when, then }) => {
        given(/^o método getAllContacts retorna todos os contatos ordenados por ordem alfabética$/, () => {});

        and(/^o contato com id "(.*)", nome "(.*)", número "(.*)" e mais "(.*)" pertence à lista$/, (id, name, number, more) => {
            // Adicionar o contato à base de dados de teste
            const contactDatabase = ContactsDatabase.getInstance();
            const newContact: Icontact = { id: id, name: name, number: number, more: more };
            contactDatabase.addContact(newContact);
        });

        and(/^o contato com id "(.*)", nome "(.*)", número "(.*)" e mais "(.*)" pertence à lista$/, (id, name, number, more) => {
            // Adicionar o contato à base de dados de teste
            const contactDatabase = ContactsDatabase.getInstance();
            const newContact: Icontact = { id: id, name: name, number: number, more: more };
            contactDatabase.addContact(newContact);
        });

        and(/^o contato com id "(.*)", nome "(.*)", número "(.*)" e mais "(.*)" pertence à lista$/, (id, name, number, more) => {
            // Adicionar o contato à base de dados de teste
            const contactDatabase = ContactsDatabase.getInstance();
            const newContact: Icontact = { id: id, name: name, number: number, more: more };
            contactDatabase.addContact(newContact);
        });

        when(/^uma requisição GET for enviada para "(.*)"$/, async (endpoint) => {
            response = await request.get(endpoint);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(Number(statusCode));
        });

        and(/^o JSON da resposta deve conter uma lista com os contatos existentes exibidos em ordem alfabética$/, () => {
            // Aqui você pode verificar se a resposta contém uma lista de contatos em ordem alfabética
            expect(Array.isArray(response.body)).toBe(true); // Verifica se a resposta é uma lista
            const contacts = response.body;
            let sortedNames = contacts.map((contact: any) => contact.name).sort();
            expect(contacts.map((contact: any) => contact.name)).toEqual(sortedNames);
        });
    });

    test('Adicionar um novo contato com sucesso', ({ given, when, then, and }) => {
        given(/^o método addContact adiciona um novo contato à lista de contatos$/, () => {});

        when(/^uma requisição POST for enviada para "(.*)" com os dados: id "(.*)", nome "(.*)", número "(.*)" e mais "(.*)"$/, async (endpoint, id, name, number, more) => {
            response = await request.post(endpoint).send({ id, name, number, more });
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(Number(statusCode));
        });

        and(/^a resposta deve conter a mensagem "(.*)"$/, (message:any) => {
            expect(response.body.message).toContain(message);
        });
    });

    test('Informações de um Contato', ({ given, when, then, and }) => {
        given(/^o método getContactById obtém as Informações de um contato pelo ID dele$/, () => {});
    
        and(/^existe um contato com id "(.*)", nome "(.*)" e número "(.*)" na lista de contatos$/, () => {
            //const contactDatabase = ContactsDatabase.getInstance();
            //const newContact: Icontact = { id: id, name: name, number: number, more: '' }; // Não há informação adicional neste contato
            //contactDatabase.addContact(newContact);
        });
    
        when(/^uma requisição GET for enviada para "(.*)"$/, async (endpoint) => {
            response = await request.get(endpoint);
        });
    
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(Number(statusCode));
        });
    
        and(/^o JSON da resposta deve conter as informações id "(.*)", name "(.*)", number "(.*)" e more "(.*)"$/, (id, name, number, more) => {
            // Verifica se a resposta possui as informações esperadas do contato
            expect(response.body.id).toBe(id);
            expect(response.body.name).toBe(name);
            expect(response.body.number).toBe(number);
            expect(response.body.more).toBe(more);
        });        
    });


    test('Busca de contato bem sucedida', ({ given, when, then, and }) => {
        given(/^o método searchContactByName está implementado na classe ContactsDatabase$/, () => {});
    
        and(/^existe um contato com id "(.*)", nome "(.*)", número "(.*)" e mais "(.*)" na lista de contatos$/, (id, name, number,more) => {
            //const contactDatabase = ContactsDatabase.getInstance();
            //const newContact: Icontact = { id: id, name: name, number: number, more: more };
            //contactDatabase.addContact(newContact);
        });
    
        and(/^existe um contato com id "(.*)", nome "(.*)", número "(.*)" e mais "(.*)" na lista de contatos$/, (id, name, number, more) => {
            //const contactDatabase = ContactsDatabase.getInstance();
            //const newContact: Icontact = { id: id, name: name, number: number, more: more }; 
            //contactDatabase.addContact(newContact);
        });

        and(/^existe um contato com id "(.*)", nome "(.*)", número "(.*)" e mais "(.*)" na lista de contatos$/, (id, name, number, more) => {
            //const contactDatabase = ContactsDatabase.getInstance();
            //const newContact: Icontact = { id: id, name: name, number: number, more: more }; 
            //contactDatabase.addContact(newContact);
        });

        when(/^uma requisição GET for enviada para "(.*)" com o parâmetro de consulta "searchTerm" como "(.*)"$/, async (endpoint, searchTerm) => {
            response = await request.get(`${endpoint}?searchTerm=${searchTerm}`);
        });
    
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(Number(statusCode));
        });
    
        and(/^o JSON da resposta deve conter uma lista contendo o contato "João Pedro" no topo dela$/, (id, name, number, more) => {
            expect(response.body).toHaveLength(1); // Verifica se a resposta contém apenas um contato
            expect(response.body[0].name).toBe('João Pedro');
        });        
    });

    test('Remover um contato da lista com sucesso', ({ given, when, then, and }) => {
        given(/^o método deleteContact está implementado na classe ContactsDatabase$/, () => {});

        and(/^existe um contato com id "(.*)", nome "(.*)", número "(.*)" na lista de contatos$/, (id, name, number) => {
            //const contactDatabase = ContactsDatabase.getInstance();
            //const newContact: Icontact = { id: id, name: name, number: number, more: '' };
            //contactDatabase.addContact(newContact);
        });

        when(/^uma requisição DELETE for enviada para "(.*)"$/, async (endpoint) => {
            response = await request.delete(endpoint);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(Number(statusCode));
        });

        and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (message: any) => {
            expect(response.body.message).toContain(message);
        });

        and(/^o contato com id "(.*)" não deve mais existir na lista de contatos$/, (id) => {
            const contactDatabase = ContactsDatabase.getInstance();
            const contact = contactDatabase.getContactById(id);
            expect(contact).toBeUndefined();
        });
    });
});
