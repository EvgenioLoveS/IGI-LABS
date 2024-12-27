import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelect from '../components/CategorySelect';

function AddPage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    author: '',
    genre: '',
    price: '',
    coverColor: '',
  });
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
        }
      })
      .catch(err => console.error(err));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (!formData.category) {
      setError('Категория обязательна');
      return;
    }
    if (formData.title.trim().length < 2) {
      setError('Название должно содержать минимум 2 символа');
      return;
    }
    if (formData.author.trim().length < 2) {
      setError('Автор должен содержать минимум 2 символа');
      return;
    }
    if (formData.genre.trim().length < 2) {
      setError('Жанр должен содержать минимум 2 символа');
      return;
    }
    const currentYear = new Date().getFullYear();
    if (formData.price < 0) {
      setError('Цена не может быть отрицательной');
      return;
    }
    if (!formData.coverColor) {
      setError('Цвет обложки обязателен');
      return;
    }

    fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      if (data._id) {
        navigate('/catalog');
      } else {
        setError(data.message || 'Ошибка при добавлении книги');
      }
    })
    .catch(err => setError('Ошибка сервера: ' + err.message));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Добавить книгу</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <CategorySelect selectedCategory={formData.category} setSelectedCategory={(category) => setFormData({ ...formData, category })} />
        <input
          type="text"
          name="title"
          placeholder="Название"
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="author"
          placeholder="Автор"
          value={formData.author}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="genre"
          placeholder="Жанр"
          value={formData.genre}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Цена"
          value={formData.price}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="coverColor"
          placeholder="Цвет обложки"
          value={formData.coverColor}
          onChange={handleChange}
          style={styles.input}
        />
        
        <button type="submit" style={styles.button}>Добавить</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f5f0e6', // Светло-персиковый оттенок для тепла и уюта
    color: '#3b3a36', // Тёмный графитовый текст
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', // Лёгкое свечение для объема
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    fontFamily: 'Georgia, serif', // Книжный шрифт
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#3b3a36', // Тёмный цвет для заголовка
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)', // Лёгкая тень для заголовка
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px', // Отступ для элементов формы
  },
  input: {
    padding: '12px',
    background: '#fff', // Белый фон для ввода
    border: '1px solid #ddd', // Лёгкая рамка
    borderRadius: '4px',
    color: '#3b3a36',
    fontSize: '1rem',
  },
  button: {
    padding: '12px',
    backgroundColor: '#8b4513', // Какао-бронзовый для кнопки добавления книги
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  error: {
    color: '#b22222', // Красный цвет для ошибок
  }
};

export default AddPage;
