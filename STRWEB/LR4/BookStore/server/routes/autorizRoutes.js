const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, googleLogin } = require('../controllers/authorizController');

const router = express.Router();

// Регистрация пользователя
router.post('/register', registerUser);

// Логин пользователя
router.post('/login', loginUser);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth' }),
  googleLogin
);

// Выход из аккаунта
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { 
      return res.status(500).json({ message: 'Logout error' }); 
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out' });
    });
  });
});

// Получение текущего пользователя
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    const { email, username } = req.user;
    res.json({ user: { email, username } });
  } else {
    res.json({ user: null });
  }
});

module.exports = router;