const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
// const rewRoutes = require('./routes/rewRoutes');

dotenv.config();

require('./config/passport');  

const app = express();
const port = 5000;
const bookRoutes = require('./routes/bookRoutes');
const autorizRoutes = require('./routes/autorizRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const contactRoutes = require('./routes/contactRoutes');


// Указываем директорию для сохранения файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Путь к папке uploads
  },
  filename: (req, file, cb) => {
    // Уникальное имя файла (добавляем дату и расширение)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Маршрут для загрузки изображений
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Файл не загружен' });
  }

  // Возвращаем ссылку на загруженное изображение
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// Статическая папка для отдачи изображений
app.use('/uploads', express.static('uploads'));

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', autorizRoutes);
app.use('/api', contactRoutes);
app.use('/api/books', bookRoutes);
// app.use('/api/reviews', rewRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/', (req, res) => {
  res.send('Welcome to the Google Auth App!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
