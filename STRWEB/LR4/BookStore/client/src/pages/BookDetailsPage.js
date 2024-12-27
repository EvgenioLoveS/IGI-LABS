import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch book details
    fetch(`http://localhost:5000/api/books/${id}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => {
        console.error('Error loading book details:', err);
        setError('Не удалось загрузить информацию о книге');
      });
  }, [id]);

  if (!book) return <p style={{ color: '#333' }}>Загрузка...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{book.title}</h2>
      <p><strong>Автор:</strong> {book.author}</p>
      <p><strong>Жанр:</strong> {book.genre}</p>
      <p><strong>Цена:</strong> ${book.price}</p>
      <p><strong>Цвет обложки:</strong> {book.coverColor}</p>
      <p><strong>Категория:</strong> {book.category.name}</p>

      <Link to="/catalog" style={{ textDecoration: 'none' }}>
        <button style={styles.button}>Назад к каталогу</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#faf0e6', // Светлый теплый фон
    color: '#333', // Тёмный текст для контраста
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Лёгкое свечение для объема
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.02)',
    }
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#3a3a3a', // Темнее для заголовка
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#B22222', // Бордовый
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: 'bold',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: '#8b0000', // Темнее бордового при наведении
    },
  },
  error: {
    color: 'red',
  }
};

export default BookDetailsPage;
