import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ book, isAuthenticated }) {
  return (
    <div style={styles.card}>
      <img src={book.imageUrl || '/default-book-image.jpg'} alt={`${book.title} image`} style={styles.image} />
      <div style={styles.details}>
        <h3 style={styles.name}>{book.title}</h3>
        <p style={styles.author}>Автор: {book.author}</p>
        <p style={styles.genre}>Жанр: {book.genre}</p>
        <p style={styles.price}>Цена: ${book.price}</p>
        <p style={styles.coverColor}>Цвет обложки: {book.coverColor}</p>
        <p style={styles.category}>Категория: {book.category.name}</p>
        <div style={styles.actions}>
          <Link to={`/books/${book._id}/details`}>
            <button style={styles.button}>Подробнее</button>
          </Link>
          {isAuthenticated && (
            <Link to={`/books/${book._id}/edit`}>
              <button style={styles.button}>Редактировать</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd', // Легкий серый контур
    padding: '15px',
    width: '250px',
    background: '#FAF9F6', // Светлый теплый оттенок для фона карточки
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Лёгкая тень для объема
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s', // Анимация при наведении
    '&:hover': {
      transform: 'translateY(-5px)', // Подъем при наведении
    }
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px', // Закругленные углы изображения
    marginBottom: '15px',
  },
  details: {
    flex: '1',
  },
  name: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#3a3a3a', // Тёмный цвет для заголовка
  },
  author: {
    fontSize: '1rem',
    color: '#555', // Бледный серый для текста
    marginBottom: '4px',
  },
  genre: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '4px',
  },
  price: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  coverColor: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '4px',
  },
  category: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '12px',
  },
  actions: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '8px 16px',
    background: '#B22222', // Бордовый для кнопок
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': {
      background: '#8b0000', // Темнее бордового при наведении
    },
  },
};

export default BookCard;
