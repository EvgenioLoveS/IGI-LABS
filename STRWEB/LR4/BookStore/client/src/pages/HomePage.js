import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  // Состояния для хранения данных, ошибок и индикатора загрузки
  const [randomFact, setRandomFact] = useState('');   // Для факта о кошках
  const [randomJoke, setRandomJoke] = useState('');   // Для случайной шутки
  const [loading, setLoading] = useState(true);  // Индикатор загрузки
  const [error, setError] = useState(null);      // Ошибки

  useEffect(() => {
    // Запрос к API фактов о кошках
    const fetchCatFact = async () => {
      try {
        const response = await axios.get('https://meowfacts.herokuapp.com/');
        setRandomFact(response.data.data[0]); // Сохраняем факт о кошке
      } catch (err) {
        setError('Error fetching cat fact');
      }
    };

    // Запрос к API шуток
    const fetchRandomJoke = async () => {
      try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        setRandomJoke(`${response.data.setup} - ${response.data.punchline}`); // Сохраняем шутку
      } catch (err) {
        setError('Error fetching random joke');
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchCatFact(), fetchRandomJoke()]);
      setLoading(false);
    };

    fetchData();
  }, []);  

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      {/* Random Cat Fact Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Случайный факт о кошке</h2>
        <p style={styles.fact}>{randomFact || "Загрузка факта о кошке..."}</p>
      </div>

      {/* Random Joke Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Случайная шутка</h2>
        <p style={styles.fact}>{randomJoke || "Загрузка шутки..."}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    color: '#333',
    background: '#f9f9f9',  // Легкий серый фон для контраста
    padding: '40px',
    borderRadius: '8px',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', // Лёгкая тень
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    background: '#fff', // Белый фон для разделов
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', // Лёгкая тень
  },
  sectionTitle: {
    fontSize: '1.8rem',
    marginBottom: '15px',
  },
  image: {
    width: '100%',
    maxWidth: '600px',  // Adjusted for book image
    borderRadius: '5px',
    marginBottom: '15px',
  },
  fact: {
    fontSize: '1.2rem',
    color: '#666',
  },
  loading: {
    fontSize: '1.5rem',
    color: '#999',
  },
  error: {
    fontSize: '1.5rem',
    color: '#d9534f', // Красный для ошибок
  }
};

export default HomePage;
