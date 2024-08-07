const express = require('express');
const { sequelize } = require('./db/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

//Urlencoded данных формы, настройка статических файлов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Подключение маршрутов
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/', authRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
sequelize
  .sync()
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log(`Database connection error: ${err.message}`);
  });
