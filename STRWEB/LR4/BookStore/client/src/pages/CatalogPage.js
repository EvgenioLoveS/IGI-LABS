import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';

function BookCatalogPage() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('price');
  const [order, setOrder] = useState('asc');
  const [error, setError] = useState('');

  // Load user data and books data
  useEffect(() => {
    // Check authentication
    fetch('http://localhost:5000/api/auth/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error('Error fetching user data:', err));

    // Construct URL with query parameters
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (sortField) params.append('sort', sortField);
    params.append('order', order);  // always add order parameter

    fetch(`http://localhost:5000/api/books?${params.toString()}`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => {
        console.error('Error loading books:', err);
        setError('Ошибка при загрузке книг');
      });
  }, [search, sortField, order]); // dependencies for request re-run

  // Handlers for search and sorting
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleOrderChange = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Каталог книг</h2>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Поиск по названию или автору"
          value={search}
          onChange={handleSearchChange}
          style={styles.input}
        />
        <select value={sortField} onChange={handleSortFieldChange} style={styles.select}>
          <option value="price">Цена</option>
          {/* <option value="size">Размер</option> */}
          {/* <option value="popularity">Популярность</option> */}
        </select>
        <button onClick={handleOrderChange} style={styles.button}>
          Порядок: {order === 'asc' ? 'Возрастание' : 'Убывание'}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.booksList}>
        {books.length === 0 ? (
          <p>Нет доступных книг для отображения.</p>
        ) : (
          books.map(book => (
            <BookCard key={book._id} book={book} isAuthenticated={!!user} />
          ))
        )}
      </div>

      {user && (
        <Link to="/books/add">
          <button style={styles.addButton}>Добавить книгу</button>
        </Link>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f0e6e0', // Мягкий персиковый оттенок, напоминающий бумагу
    color: '#333', // Тёмный текст
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Лёгкое свечение для объема
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh', // Минимальная высота для заполнения всей высоты экрана
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#3b3a36', // Тёмный серый для заголовка
    textAlign: 'center', // Центрируем заголовок
    fontFamily: 'Georgia, serif', // Книжный шрифт
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Легкое тень для заголовка
  },
  filters: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    background: '#eae2d3', // Слегка желтоватый оттенок для текстового поля
    border: '1px solid #ccc', // Лёгкая рамка
    borderRadius: '4px',
    color: '#3b3a36',
  },
  select: {
    padding: '10px',
    background: '#eae2d3',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: '#3b3a36',
  },
  button: {
    padding: '10px 15px',
    background: '#b2a9a0', // Цвет кнопки сортировки, напоминающий дерево
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
  },
  addButton: {
    padding: '12px 18px',
    background: '#8b4513', // Какао-бронзовый для кнопки добавления книги
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
    position: 'absolute',
    bottom: '-140px',
    right: '40px', // Относительно контейнера
  },
  booksList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '25px', // Увеличим отступы между книгами
  },
  error: {
    color: '#b22222', // Красный цвет для ошибки
  },
};

export default BookCatalogPage;
