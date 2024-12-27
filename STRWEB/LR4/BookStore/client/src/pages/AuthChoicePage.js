import React from 'react';
import { useNavigate } from 'react-router-dom';

function AuthChoicePage() {
  const navigate = useNavigate();

  const handlePasswordLogin = () => {
    navigate('/auth/password');
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Выберите способ входа</h2>
      <button onClick={handlePasswordLogin} style={styles.button}>Вход по паролю</button>
      <button onClick={handleGoogleLogin} style={{ ...styles.button, marginTop: '10px' }}>Вход через Google</button>
    </div>
  );
}

const styles = {
  container: {
    color: '#333',
    background: '#FAF9F6', // Светлый теплый фон, подходящий для книжного магазина
    padding: '30px',
    fontFamily: 'Georgia, serif', // Книжный шрифт
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    }
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#3a3a3a', // Тёмный текст для заголовка
    fontFamily: 'Georgia, serif', // Книжный шрифт
  },
  button: {
    padding: '12px',
    backgroundColor: '#8b4513', // Бордовый цвет для кнопок
    border: 'none',
    borderRadius: '5px',
    fontFamily: 'Georgia, serif', // Книжный шрифт
    cursor: 'pointer',
    color: '#fff',
    fontWeight: 'bold',
    width: '100%',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#8b0007', // Темнее бордового при наведении
    }
  }
};

export default AuthChoicePage;
