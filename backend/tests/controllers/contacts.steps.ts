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

        and(/^o contato com id "(.*)", nome "(.*)", número "(.*)" pertence à lista$/, (id, name, number, more) => {
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
    
        and(/^existe um contato com id "(.*)", nome "(.*)" e número "(.*)" na lista de contatos$/, (id, name, number) => {
            const contactDatabase = ContactsDatabase.getInstance();
            const newContact: Icontact = { id: id, name: name, number: number, more: '' }; // Não há informação adicional neste contato
            contactDatabase.addContact(newContact);
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


});
