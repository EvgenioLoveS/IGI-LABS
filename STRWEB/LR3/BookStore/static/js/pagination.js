document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 3;
    const items = document.querySelectorAll('#main .item');
    const totalPages = Math.ceil(items.length / itemsPerPage);
    let currentPage = 1;

    // Функция отображения элементов для текущей страницы
    function showPage(page) {
        items.forEach((item, index) => {
            item.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? 'block' : 'none';
        });
    }
    // Функция создания кнопок пагинации
    function createPagination() {
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add('pagination');
        // Генерация кнопок для всех страниц
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('page-btn');
            // Добавляем обработчик события клика для каждой кнопки
            pageButton.addEventListener('click', function () {
                currentPage = i;
                showPage(currentPage);
                updateButtons();
            });
            paginationContainer.appendChild(pageButton);
        }
        // Добавляем контейнер пагинации в DOM (внутрь .book-list-container)
        document.querySelector('.book-list-container').appendChild(paginationContainer); // Изменено здесь
    }
    // Функция обновления состояния кнопок (выделение активной кнопки)
    function updateButtons() {
        document.querySelectorAll('.page-btn').forEach((btn, index) => {
            btn.classList.toggle('active', index + 1 === currentPage);
        });
    }

    showPage(currentPage);
    createPagination();
    updateButtons();
});
