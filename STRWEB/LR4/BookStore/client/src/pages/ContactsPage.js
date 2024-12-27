import React from 'react';
import ContactList from '../components/ContactList';

function ContactsPage() {
  return (
    <div style={styles.pageContainer}>
      <h1>Contacts</h1>
      <ContactList />
    </div>
  );
}

const styles = {
  pageContainer: {
    padding: '40px',
    backgroundColor: '#e9e9e9',
  },
};

export default ContactsPage;