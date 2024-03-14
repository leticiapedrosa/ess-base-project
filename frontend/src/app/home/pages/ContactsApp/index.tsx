import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ContactsApp.module.css'
//import './ContactsApp.module.css';


interface Icontact {
  id: string;
  name: string;
  number: string;
  more: string;
}

const ContactsApp: React.FC = () => {
  const [contacts, setContacts] = useState<Icontact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newContact, setNewContact] = useState({ name: '', number: '', more: '' });


  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await axios.get('/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    }
    
    fetchContacts();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/contacts/search?searchTerm=${searchTerm}`);
      setContacts(response.data);
    } catch (error) { 
      console.error('Error search', error);
    }
  };

  const handleAddContact = async () => {
    try {
      await axios.post('/api/contacts', newContact);
      const response = await axios.get('/api/contacts');
      setContacts(response.data);
      setNewContact({ name: '', number: '', more: '' });
    } catch (error) {
      console.error('Error add', error);
    }
  };

  const handleDeleteContact = async (id) => {
    await axios.delete(`/api/contacts/${id}/info/delete`);
    const response = await axios.get('/api/contacts');
    setContacts(response.data);
  };

  return (
    <div className="contacts-list">
      <h1>Lista de Contatos</h1>
      
   
        <ul className = {styles.contactList}>
          {contacts.map((contact) => (
            <li key={contact.id} className={styles.contactItem}>
                <div className={styles.contactName}>{contact.name}</div>
            </li>
            ))}
        </ul>
  

      <input type="text" placeholder="Buscar contato" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>
      

      
      <ul>
        {contacts.map(contact => (
          <li key={contact.id} className="contactItem">
            {contact.name} - {contact.number}
            <button onClick={() => handleDeleteContact(contact.id)}>Deletar</button>
          </li>
        ))}
      </ul>


      <h2>Adicionar Contato</h2>
      <input type="text" placeholder="Nome" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} />
      <input type="text" placeholder="Número" value={newContact.number} onChange={(e) => setNewContact({ ...newContact, number: e.target.value })} />
      <input type="text" placeholder="Mais" value={newContact.more} onChange={(e) => setNewContact({ ...newContact, more: e.target.value })} />
      <button onClick={handleAddContact}>Adicionar</button>
    
    
    </div>
  );


};

export default ContactsApp;
