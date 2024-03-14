import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContactsApp() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newContact, setNewContact] = useState({ name: '', number: '' });

  useEffect(() => {
    async function fetchContacts() {
      const response = await axios.get('/api/contacts');
      setContacts(response.data);
    }
    fetchContacts();
  }, []);

  const handleSearch = async () => {
    const response = await axios.get(`/api/contacts/search?searchTerm=${searchTerm}`);
    setContacts(response.data);
  };

  const handleAddContact = async () => {
    await axios.post('/api/contacts', newContact);
    const response = await axios.get('/api/contacts');
    setContacts(response.data);
    setNewContact({ name: '', number: '' });
  };

  const handleDeleteContact = async (id) => {
    await axios.delete(`/api/contacts/${id}/info/delete`);
    const response = await axios.get('/api/contacts');
    setContacts(response.data);
  };

  return (
    <div>
      <h1>Lista de Contatos</h1>
      <input type="text" placeholder="Buscar contato" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.number}
            <button onClick={() => handleDeleteContact(contact.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h2>Adicionar Contato</h2>
      <input type="text" placeholder="Nome" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} />
      <input type="text" placeholder="Número" value={newContact.number} onChange={(e) => setNewContact({ ...newContact, number: e.target.value })} />
      <button onClick={handleAddContact}>Adicionar</button>
    </div>
  );
}

export default ContactsApp;
