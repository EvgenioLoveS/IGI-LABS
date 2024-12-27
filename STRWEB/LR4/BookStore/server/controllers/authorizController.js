// controllers/authController.js
const User = require("../models/User");

// Регистрация пользователя
const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password, googleAuth: false });
    await user.save();

    // Создаём сессию через req.login
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json({ success: true, user: { email: user.email, username: user.username } });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Логин пользователя
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Проверка пароля
    if (!user.googleAuth) {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(400).json({ message: 'User registered via Google. Use Google login.' });
    }

    // Создаём сессию через req.login
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ success: true, user: { email: user.email, username: user.username } });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Вход через Google (Passport.js)
const googleLogin = (req, res) => {
  // После успешной аутентификации через Google, создаётся сессия
  // Перенаправляем пользователя на фронтенд
  res.redirect('http://localhost:3000/catalog');
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
};