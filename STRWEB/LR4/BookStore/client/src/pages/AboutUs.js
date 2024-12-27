import React from 'react';
import ContactList from '../components/ContactList';  // Импортируем компонент для отображения контактов

function AboutUs() {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>О нас</h1>
      <p style={styles.subtitle}>Информация о нас:</p>
      <ContactList />
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: '#faf0e6', // Светлый бежевый фон, напоминающий цвет книги
    color: '#3c3c3c', // Темно-серый текст
    padding: '40px',
    borderRadius: '8px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    backgroundImage: 'url("/images/book-pattern.png")', // Фон с паттерном книги (псевдографика)
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    color: '#3c3c3c', // Темно-серый цвет заголовка
    textAlign: 'center',
    fontFamily: 'Georgia, serif', // Книжный шрифт
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Легкое тень для заголовка
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#5a5a5a', // Светло-серый цвет для подзаголовка
    textAlign: 'center',
    fontFamily: 'Georgia, serif',
  },
};

export default AboutUs;
