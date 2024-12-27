
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Клиентская валидация
    if (!email.includes('@')) {
      setErrorMsg('Некорректный email');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Пароль слишком короткий');
      return;
    }

    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      credentials: 'include', 
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Вход выполнен успешно!');
        navigate('/catalog'); 
      } else {
        setErrorMsg(data.message || 'Ошибка при входе');
      }
    })
    .catch(err => setErrorMsg('Ошибка сервера: ' + err.message));
  };

  return (
    <div style={styles.container}>
      <h2>Вход по паролю</h2>
      {errorMsg && <p style={styles.error}>{errorMsg}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          style={styles.input}
        />
        <input 
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Войти</button>
      </form>
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
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    background: '#fff',
    border: '1px solid #f0f0f0',
    borderRadius: '3px',
    color: '#333'
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
  },
  error: {
    color: 'red'
  }
};

export default AuthPasswordPage;