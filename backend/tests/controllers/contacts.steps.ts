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
});
