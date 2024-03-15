import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ContactsApp.module.css'
import trashIcon from '../assets/trash-can.png';

interface Icontact {
  id: string;
  name: string;
  number: string;
  more: string;
}

const ContactsApp: React.FC = () => {

  const [contacts, setContacts] = useState<Icontact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<Icontact | null>(null);
  const [newContact, setNewContact] = useState<Icontact>({
    id: '',
    name: '',
    number: '',
    more: '',
   });


  const fetchContacts  = async (searchTerm?: string)  => {
    try {
      let url = 'http://localhost:5001/api/contacts';
      if (searchTerm) {
        url += `/search?searchTerm=${encodeURIComponent(searchTerm)}`;
    }
      const response = await axios.get(url);
      setContacts(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Erro ao buscar contato:', error);
      if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 404) {
              setErrorMessage('Contato não encontrado');
          }
      }
      setContacts([]);    
    }
  }

  useEffect(() => {
    fetchContacts(searchTerm);
  }, [searchTerm]);

  const handleContactClick = async (contact: Icontact) => {
    setSelectedContact(contact);
   };

  const handleDeleteContact = async (contactId: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/contacts/${contactId}/info/delete/`);
      fetchContacts();
      setSelectedContact(null);
    } catch (error) {
      console.error('Erro ao excluir conversa:', error);
    }
  };

  const handleAddContact = async () => {

    if (!newContact.name || !newContact.number) {
      setErrorMessage('Preencha todos os campos');
      setTimeout(() => {
        setErrorMessage('');
    }, 3000);
      return; // Interrompe a execução da função se os campos necessários não estiverem preenchidos
   }

    try {
       await axios.post('http://localhost:5001/api/contacts', newContact);
       setNewContact({ id: '', name: '', number: '', more: '' }); // Limpa o formulário após a adição
       fetchContacts(); // Atualiza a lista de contatos
    } catch (error) {
       console.error('Erro ao adicionar contato:', error);
       setErrorMessage('Erro ao adicionar contato');
       setTimeout(() => {
        setErrorMessage('');
    }, 3000);
    }
   };
   

  return (
    <div className={styles.container}>
      <div className={styles.contactsContainer}>
      <h2>Lista de Contatos</h2> 
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Pesquisar contato..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        <button
            className={styles.clearSearchButton}
            onClick={() => setSearchTerm('')}> X </button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      
        <ul className={styles.contactList}>
          {contacts.map((contact, index) => (
            <li key={index} className={styles.contactItem} onClick={() => handleContactClick(contact)}>
              <div className={styles.contactName}>{contact.name}</div>
            </li>
          ))}
        </ul>

      {selectedContact && (
          <div className={styles.contactDetails}>
            <div className={styles.contactHeader}>
              <h3>{selectedContact.name}</h3>
              <img src={trashIcon}
                alt="Excluir"
                className={styles.trashIcon} 
                onClick={() => handleDeleteContact(selectedContact.id)} />
            </div>
            <p>Número: {selectedContact.number}</p>
            <p>Mais: {selectedContact.more}</p>
            <button onClick={() => setSelectedContact(null)}>Fechar</button>
          </div>
        )}
      </div>  

    <div className={styles.addContactForm}>
      <h3>Adicionar Contato</h3>
      <input
        type="text"
        placeholder="Nome"
        value={newContact.name}
        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Número"
        value={newContact.number}
        onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
      />
      <input
        type="text"
        placeholder="Mais Informações (opcional)"
        value={newContact.more}
        onChange={(e) => setNewContact({ ...newContact, more: e.target.value })}
      />
      <button onClick={handleAddContact}>Adicionar</button>
    </div>
    </div>
);
};
export default ContactsApp;
