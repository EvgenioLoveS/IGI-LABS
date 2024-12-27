import React, { useState, useEffect } from 'react';
import BookCard from './BookCard'; // Импортируем компонент карточки книги

function Catalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => {
        if (!res.ok) {
          throw new Error('Не удалось загрузить книги');
        }
        return res.json();
      })
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Ошибка загрузки книг');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Загрузка книг...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={styles.catalogContainer}>
      <h2>Каталог книг</h2>
      <div style={styles.bookList}>
        {books.length === 0 ? (
          <p>Нет доступных книг</p>
        ) : (
          books.map(book => (
            <BookCard key={book._id} book={book} isAuthenticated={true} />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  catalogContainer: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bookList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  }
};

export default Catalog;
