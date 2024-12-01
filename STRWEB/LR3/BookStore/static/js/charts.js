// Функция для вычисления факториала
function computeFactorial(n) {
    let factorial = 1;
    if (n === 0) return factorial;
    for (let i = 1; i <= n; i++) {
        factorial *= i;
    }
    return factorial;
}

// Функция для возведения в степень
function computePower(base, exponent) {
    return Math.pow(base, exponent);
}

// Функция разложения ln((x+1)/(x-1)) в ряд
function lnSeries(x, eps, maxIterations = 500) {
    let result = 0;
    for (let n = 0; n < maxIterations; n++) {
        let term = 1 / ((2 * n + 1) * computePower(x, 2 * n + 1));
        result += term;
        if (Math.abs(term) < eps) break;
    }
    return result * 2;
}

// Генерация данных для графика
const seriesData = [];
const mathData = [];
const xValues = [];

for (let n = 1; n <= 20; n++) {
    // Данные разложения в ряд
    seriesData.push(lnSeries(x, eps, n));

    // Данные для функции math.log
    mathData.push(Math.log((x + 1) / (x - 1)));

    // Значения X (номер итерации)
    xValues.push(n);
}

// Инициализация Chart.js с построением графика
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xValues,
        datasets: [
            {
                label: 'Разложение функции',
                data: seriesData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            },
            {
                label: 'Функция Math.log',
                data: mathData,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            annotation: {
                annotations: {
                    box1: {
                        type: 'line',
                        borderColor: 'black',
                        borderWidth: 1,
                        label: {
                            display: true,
                            content: 'Аннотация',
                            position: 'start'
                        }
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Количество итераций'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Значение функции'
                }
            }
        }
    }
});
