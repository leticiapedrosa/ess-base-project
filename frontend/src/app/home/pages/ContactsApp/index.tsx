import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ContactsApp.module.css'


interface Icontact {
  id: string;
  name: string;
  number: string;
  more: string;
}

const ContactsApp: React.FC = () => {
  const [contacts, setContacts] = useState<Icontact[]>([]);

  useEffect(() => {
    const fetchContacts  = async ()  => {
      try {
        const response = await axios.get('http://localhost:5001/api/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    }
    
    fetchContacts();
  }, []);

  return (
    <div className={styles.container}>
    <h2>Lista de Contatos</h2>
    <ul className={styles.contactList}>
        {contacts.map((contact, index) => (
        <li key={index} className={styles.contactItem}>
            <div className={styles.contactName}>{contact.name}</div>
        </li>
        ))}
    </ul>
    </div>
);
};
export default ContactsApp;
