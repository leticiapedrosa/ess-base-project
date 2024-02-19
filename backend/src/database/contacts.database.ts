import { Contact } from '../interfaces/contacts.interface';

export default class ContactsDatabase {
    private static instance: ContactsDatabase;
    private contacts: Contact[];

    private constructor() {
        this.contacts = [
            { id: '1', name: 'Alice', number: '00000000', more: 'É chorona' },
            { id: '3', name: 'Charlie', number: '00000002', more: '' },
            { id: '2', name: 'Bob', number: '00000001', more: 'Apelido: Marley' },
          ];;
    }

    static getInstance() {
        if (!ContactsDatabase.instance) {
            ContactsDatabase.instance = new ContactsDatabase();
        }
        return ContactsDatabase.instance;
    }

    // Método para adicionar um novo contato
    addContact(contact: any) {
        this.contacts.push(contact);
    }

    // Método para obter um contato pelo ID
    getContactById(contactId: string) {
        return this.contacts.find(contact => contact.id === contactId);
    }

    // Método para remover um contato com base no ID
    deleteContact(contactId: string) {
        this.contacts = this.contacts.filter(contact => contact.id !== contactId);
        return this.contacts;
    }    

    // Método para obter todos os contatos ordenados por nome em ordem alfabética
    getAllContacts() {    
    return this.contacts.slice().sort((a, b) => a.name.localeCompare(b.name));
}

}