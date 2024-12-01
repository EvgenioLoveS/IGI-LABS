document.addEventListener("DOMContentLoaded", function () {
    const countdownDuration = 3600; // Время для отсчета в секундах (1 час)
    let countdownInterval; // Интервал таймера

    // Ищем элемент для отображения обратного отсчета
    const countdownElement = document.getElementById("remaining-time");
    if (!countdownElement) return; // Если элемента нет, выходим из функции

    function startCountdown() {
        let countdownStart = localStorage.getItem("countdownStart");

        // Если начальное время не задано, сохраняем текущее время в localStorage
        if (!countdownStart) {
            countdownStart = Date.now();
            localStorage.setItem("countdownStart", countdownStart);
        } else { // Если значение уже есть
            countdownStart = parseInt(countdownStart, 10);
        }

        // Рассчитываем оставшееся время                  
        let remainingTime = countdownDuration - Math.floor((Date.now() - countdownStart) / 1000);

        function updateCountdown() {
            if (remainingTime <= 0) {
                clearInterval(countdownInterval); // Останавливаем таймер
                countdownElement.innerHTML = "<i>Обратный отсчет завершен!</i>";
                localStorage.removeItem("countdownStart"); // Удаляем начальное время
                return;
            }

            // Форматируем оставшееся время
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            countdownElement.innerHTML = `<i>Оставшееся время: ${minutes} мин ${seconds} сек</i>`;

            // Уменьшаем оставшееся время
            remainingTime--;
        }

        // Обновляем обратный отсчет немедленно
        updateCountdown();

        // Обновляем каждую секунду
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    startCountdown();
});
