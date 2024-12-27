import React, { useState } from 'react';

function AuthForm() {
  const [email, setEmail] = useState('');        
  const [password, setPassword] = useState('');  
  const [errorMsg, setErrorMsg] = useState('');
  
  const validateForm = () => {
    if (!email.includes('@')) {
      setErrorMsg('Некорректный email'); 
      return false;
    }
    if (password.length < 6) {
      setErrorMsg('Пароль слишком короткий');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Событие #7
    if (!validateForm()) return;

    // Отправляем запрос на сервер /api/auth/register или /api/auth/login
    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        setErrorMsg('');
        localStorage.setItem('token', data.token);
        alert('Успешно!'); // простая реакция
      } else {
        setErrorMsg(data.message || 'Ошибка при регистрации');
      }
    })
    .catch(err => setErrorMsg('Ошибка сервера: ' + err.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMsg && <p style={{color:'red'}}>{errorMsg}</p>}
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Пароль" 
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}

export default AuthForm;