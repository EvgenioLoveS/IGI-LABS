import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategorySelect from '../components/CategorySelect';

function EditBookPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState('');
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/user', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (!data.user) {
          navigate('/auth');
        } else {
          setUser(data.user);

          fetch(`http://localhost:5000/api/books/${id}`)
            .then(res => res.json())
            .then(data => setBook(data))
            .catch(err => setError('Ошибка при загрузке книги'));
        }
      })
      .catch(err => console.error(err));
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (!book.category) {
      setError('Категория обязательна');
      return;
    }
    if (book.title.trim().length < 2) {
      setError('Название должно содержать минимум 2 символа');
      return;
    }
    if (book.author.trim().length < 2) {
      setError('Автор должен содержать минимум 2 символа');
      return;
    }
    if (!book.genre) {
      setError('Жанр обязателен');
      return;
    }
    if (book.price < 0) {
      setError('Цена не может быть отрицательной');
      return;
    }
    if (!book.coverColor) {
      setError('Цвет обложки обязателен');
      return;
    }

    fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(book)
    })
      .then(res => res.json())
      .then(data => {
        if (data._id) {
          navigate('/catalog');
        } else {
          setError(data.message || 'Ошибка при обновлении книги');
        }
      })
      .catch(err => setError('Ошибка сервера: ' + err.message));
  };

  const handleDelete = () => {
    if (!window.confirm('Вы уверены, что хотите удалить эту книгу?')) return;

    fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Book deleted') {
          navigate('/catalog');
        } else {
          setError(data.message || 'Ошибка при удалении книги');
        }
      })
      .catch(err => setError('Ошибка сервера: ' + err.message));
  };

  if (!book) return <p style={{ color: '#fff' }}>Загрузка...</p>;

  return (
    <div style={styles.container}>
      <h2>Редактировать книгу</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <CategorySelect selectedCategory={category} setSelectedCategory={setCategory} />
        <input 
          type="text"
          name="title"
          placeholder="Название"
          value={book.title}
          onChange={handleChange}
          style={styles.input}
        />
        <input 
          type="text"
          name="author"
          placeholder="Автор"
          value={book.author}
          onChange={handleChange}
          style={styles.input}
        />
        <input 
          type="text"
          name="genre"
          placeholder="Жанр"
          value={book.genre}
          onChange={handleChange}
          style={styles.input}
        />
        <input 
          type="number"
          name="price"
          placeholder="Цена"
          value={book.price}
          onChange={handleChange}
          style={styles.input}
        />
        <input 
          type="text"
          name="coverColor"
          placeholder="Цвет обложки"
          value={book.coverColor}
          onChange={handleChange}
          style={styles.input}
        />
        <input 
          type="text"
          name="imageUrl"
          placeholder="URL изображения"
          value={book.imageUrl || ''}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Обновить</button>
      </form>
      <button onClick={handleDelete} style={styles.deleteButton}>Удалить книгу</button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f5f0e6',
    color: '#3b3a36',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    fontFamily: 'Georgia, serif',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#3b3a36',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    color: '#333',
    fontSize: '1rem',
  },
  button: {
    padding: '12px',
    backgroundColor: '#8b4513',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  deleteButton: {
    padding: '12px',
    background: '#8b4513',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
    marginTop: '10px',
    fontWeight: 'bold',
  },
  error: {
    color: '#d9534f',
    marginBottom: '15px',
  },
};


export default EditBookPage;
