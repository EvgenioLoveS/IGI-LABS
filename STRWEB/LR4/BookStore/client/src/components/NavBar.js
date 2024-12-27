import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TimeZoneDisplay from './TimeZoneDisplay';  // Импортируем компонент

function NavBar() {
  const [user, setUser] = useState(null);

  // Fetch user info
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/user', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error(err));
  }, []);

  // Handle logout action
  const handleLogout = () => {
    fetch('http://localhost:5000/api/auth/logout', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(() => {
      setUser(null);
      window.location.href = '/';
    })
    .catch(err => console.error(err));
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#2C3E50', // Темный оттенок синего для навигации
    color: '#ECF0F1', // Светлый оттенок серого для текста
    padding: '10px 40px',
    alignItems: 'center',
    width: '97%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Лёгкая тень для объёма
  };

  const leftStyle = {
    display: 'flex',
    gap: '30px',
    alignItems: 'center'
  };

  const rightStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  };

  const linkStyle = {
    color: '#ECF0F1',
    textDecoration: 'none',
    fontFamily: 'Georgia, serif', // Книжный шрифт

    fontSize: '18px',
    padding: '5px 10px',
    borderRadius: '3px',
    transition: 'background 0.3s', // Плавный переход для ссылки
    '&:hover': {
      background: '#34495E' // Темный синий при наведении
    }
  };

  const buttonStyle = {
    background: '#E74C3C', // Бордовый для кнопки выхода
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '3px',
    transition: 'background 0.3s', // Плавный переход для кнопки
    '&:hover': {
      background: '#C0392B' // Темнее бордового при наведении
    }
  };

  return (
    <nav style={navStyle}>
      <div style={leftStyle}>
        <span style={{ color: '#ECF0F1', fontSize: '24px', fontFamily: 'Georgia, serif', fontWeight: 'bold' }}>ЛИТЕРАТУРНЫЙ РАЙ</span>
        <Link to="/" style={linkStyle}>Главная</Link>
        <Link to="/catalog" style={linkStyle}>Каталог</Link>
        <Link to="/contacts" style={linkStyle}>О нас</Link>
      </div>
      <div style={rightStyle}>
        {!user && (
          <>
            <Link to="/auth" style={linkStyle}>Войти</Link>
            <Link to="/register" style={linkStyle}>Регистрация</Link>
          </>
        )}
        {user && (
          <>
            <span style={{ color: '#ECF0F1', fontSize: '16px' }}>{user.username}</span>
            <button onClick={handleLogout} style={buttonStyle}>Выйти</button>
            <TimeZoneDisplay />
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
