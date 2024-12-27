import React, { useEffect, useState } from 'react';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/contacts')  
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched contacts:', data);  // Логируем данные, полученные с сервера
        setContacts(data); // Устанавливаем полученные данные
        setLoading(false); // Завершаем процесс загрузки
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
        setError('Ошибка загрузки контактов');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.contactList}>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact._id} style={styles.contactCard}>
              <h3 style={styles.contactName}>{contact.name}</h3>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Message:</strong> {contact.message}</p>
              <p><strong>Company Name:</strong> {contact.companyName}</p>
              <p><strong>Description:</strong> {contact.description}</p>
              <p><strong>Address:</strong> {contact.address}</p>
              {contact.socialMedia && (
                <div>
                  <p><strong>Facebook:</strong> {contact.socialMedia.facebook}</p>
                  <p><strong>Twitter:</strong> {contact.socialMedia.twitter}</p>
                  <p><strong>Instagram:</strong> {contact.socialMedia.instagram}</p>
                  <p><strong>LinkedIn:</strong> {contact.socialMedia.linkedin}</p>
                </div>
              )}
              <div>
                <p><strong>Working Hours:</strong></p>
                <p>Monday: {contact.workingHours.monday}</p>
                <p>Tuesday: {contact.workingHours.tuesday}</p>
                <p>Wednesday: {contact.workingHours.wednesday}</p>
                <p>Thursday: {contact.workingHours.thursday}</p>
                <p>Friday: {contact.workingHours.friday}</p>
                <p>Saturday: {contact.workingHours.saturday}</p>
                <p>Sunday: {contact.workingHours.sunday}</p>
              </div>
              {contact.coordinates && (
                <div>
                  <p><strong>Latitude:</strong> {contact.coordinates.latitude}</p>
                  <p><strong>Longitude:</strong> {contact.coordinates.longitude}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Нет доступных контактов.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f0f0f0', // Светлый серый фон
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Легкое свечение для объема
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  contactCard: {
    background: '#fff', // Белый фон для карточек
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Легкое тень для объема
    color: '#333', // Тёмный текст
  },
  contactName: {
    fontSize: '1.5rem',
    color: '#333', // Тёмно-серый цвет имени контакта
  },
};

export default ContactList;
