const shelf = document.querySelector('.shelf');// Находим полку
const books = document.querySelectorAll('.book');// Находим все книги на полке
// Переменная для таймера, отслеживающая завершение прокрутки
let isScrolling;
// Добавляем событие на прокрутку страницы
window.addEventListener('scroll', () => {
    // Если полка еще не трясется, добавляем ей класс 'shake'
    if (!shelf.classList.contains('shake')) {
        shelf.classList.add('shake');
    }
    // Добавляем всем книгам класс 'bounce', если его нет
    books.forEach(book => {
        if (!book.classList.contains('bounce')) {
            book.classList.add('bounce');
        }
    });

    // Таймер для остановки анимации после завершения прокрутки
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        // Убираем класс 'shake' с полки
        shelf.classList.remove('shake');
        books.forEach(book => book.classList.remove('bounce'));
    }, 150); // Задержка перед остановкой анимации
});