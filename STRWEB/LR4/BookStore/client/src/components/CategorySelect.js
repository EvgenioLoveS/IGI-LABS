import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function CategorySelect({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/categories', {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка при загрузке категорий:', err);
        setError('Не удалось загрузить категории');
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={styles.loading}>Загрузка категорий...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <label htmlFor="category" style={styles.label}>Категория:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={styles.select}
      >
        <option value="">Выберите категорию</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
}

CategorySelect.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired
};

const styles = {
  container: {
    marginBottom: '10px'
  },
  label: {
    display: 'block',
    marginBottom: '5px'
  },
  select: {
    padding: '10px',
    background: '#333',
    border: '1px solid #555',
    borderRadius: '3px',
    color: '#fff',
    width: '100%'
  },
  error: {
    color: 'red'
  },
  loading: {
    color: '#ffcc00'
  }
};

export default CategorySelect;