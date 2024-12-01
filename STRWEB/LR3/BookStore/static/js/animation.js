document.addEventListener('DOMContentLoaded', function () {
    // Находим контейнер для букв
    const canvas = document.querySelector('.canvas');
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']; // Буквы от A до M

    // Переменная для отслеживания последней позиции прокрутки
    let lastScrollY = window.scrollY; // Текущая позиция прокрутки

    // Обработчик события прокрутки
    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;// Текущая позиция прокрутки
        const direction = currentScrollY > lastScrollY ? 'down' : 'up'; // Направление прокрутки
        lastScrollY = currentScrollY; // Обновляем последнюю позицию прокрутки

        // Создаем букву на экране
        createLetter(currentScrollY, direction);
    });

      // Функция для создания буквы
    function createLetter(scrollY, direction) {
        // Выбираем случайную букву из массива
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        const letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        letterElement.textContent = randomLetter; // Устанавливаем текст буквы


        letterElement.style.left = `${Math.random() * window.innerWidth}px`; // Устанавливаем случайное расположение по горизонтали
        letterElement.style.top = `${scrollY + 50}px`; // Появление чуть ниже текущей прокрутки


        // Выбираем анимацию в зависимости от направления прокрутки
        letterElement.style.animation = direction === 'down' 
            ? 'fallDown 4s ease-in' 
            : 'fallUp 4s ease-in';

        // Добавляем букву в контейнер
        canvas.appendChild(letterElement);

        // Удаляем букву через 4 секунды после завершения анимации
        setTimeout(() => {
            letterElement.remove();
        }, 4000);
    }
});