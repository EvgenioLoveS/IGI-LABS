document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const slideCounter = document.getElementById("slideCounter");
    const sliderContainer = document.querySelector(".slider-container");

    // Получение задержки из контекста
    const delay = parseInt(sliderContainer.dataset.delay, 10) || 5000; // Используем значение из контекста или дефолтное 5 сек.

    const config = {
        auto: true, // Автоматическое переключение
        loop: true, // Листание по кругу
        delay: delay, // Задержка между слайдами (из data-delay или 5000 мс)
        navs: true, // Отображение кнопок "вперед" и "назад"
        pags: true, // Отображение пагинации (точек)
        stopMouseHover: true, // Остановка автопрокрутки при наведении мыши
    };
    let interval;

    // Функция отображения текущего слайда
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none"; // Показываем только текущий слайд
            dots[i].classList.toggle("active", i === index); // Активируем точку пагинации для текущего слайда
        });
        slideCounter.innerText = `${index + 1}/${slides.length}`; // Отображение номера текущего слайда
    }

    // Переключение на следующий слайд
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length; // Переход на следующий слайд (по кругу)
        showSlide(currentSlide);
    }

    // Переключение на предыдущий слайд
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Переход на предыдущий слайд
        showSlide(currentSlide);
    }

    // Обработчики кнопок "вперед" и "назад"
    document.getElementById("nextSlide").addEventListener("click", nextSlide);
    document.getElementById("prevSlide").addEventListener("click", prevSlide);

    // Обработчики точек пагинации
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            currentSlide = i; // Установить текущий слайд по клику на точку
            showSlide(currentSlide);
        });
    });

    // Запуск автоматической смены слайдов
    function startAutoSlide() {
        if (config.auto) {
            interval = setInterval(nextSlide, config.delay); // Переключение слайдов через указанную задержку
        }
    }

    // Остановка автоматической смены слайдов
    function stopAutoSlide() {
        clearInterval(interval); // Останавливает интервал переключения
    }

    //Если в настройках отключены кнопки автоматическое переключение
    if (config.auto) {
        startAutoSlide();

        if (config.stopMouseHover) {
            document.querySelector(".slider-container").addEventListener("mouseenter", stopAutoSlide); // Остановка при наведении
            document.querySelector(".slider-container").addEventListener("mouseleave", startAutoSlide); // Перезапуск при уходе мыши
        }
    }

    //Если в настройках отключены кнопки
    if (!config.navs) {
        document.getElementById("nextSlide").style.display = "none";
        document.getElementById("prevSlide").style.display = "none";
    }

    //Если в настройках отключена пагинация
    if (!config.pags) {
        document.querySelector(".pagination").style.display = "none";
    }

    showSlide(currentSlide);
});
