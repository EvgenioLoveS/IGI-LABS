// oop_prototype.js - Реализация с прототипным наследованием

function Cube(size) {
    this.size = size;
}


// Геттер для длины ребра
Cube.prototype.getSize = function () {
    return this.size;
};

// Сеттер для длины ребра
Cube.prototype.setSize = function (value) {
    if (value <= 0) throw new Error("Size must be positive");
    this.size = value;
};

Cube.prototype.volume = function() {
    return Math.pow(this.size, 3);
};

function ColoredCube(size, color) {
    Cube.call(this, size);
    this.color = color;
}

ColoredCube.prototype = Object.create(Cube.prototype); // Устанавливаем прототип ColoredCube как наследника Cube
ColoredCube.prototype.constructor = ColoredCube; // Устанавливаем правильный конструктор

// Геттер для цвета
ColoredCube.prototype.getColor = function () {
    return this.color;
};

// Сеттер для цвета
ColoredCube.prototype.setColor = function (value) {
    this.color = value;
};

// Метод для добавления куба в массив кубов
ColoredCube.prototype.addCube = function(cubeArray, cube) {
    cubeArray.push(cube);
};

// Метод для отображения всех кубов в массиве
ColoredCube.prototype.displayAllCubes = function(cubeArray) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Очистка перед выводом

    cubeArray.forEach(cube => {
        outputDiv.innerHTML += `<p>Размер: ${cube.size} см, Цвет: ${cube.color}, Объем: ${cube.volume()} см³</p>`;
    });
};

// Метод для подсчета количества кубов по цветам и вычисления общего объема
ColoredCube.prototype.countAndVolume = function(cubeArray) {
    const colorCount = { red: 0, yellow: 0, blue: 0, green: 0 };
    let totalVolume = 0;

    cubeArray.forEach(cube => {
        colorCount[cube.color]++;
        totalVolume += cube.volume();
    });

    return { colorCount, totalVolume };
};

// Функция-обработчик события отправки формы
function handleFormSubmission(event) {
    event.preventDefault();
    const cubeData = document.getElementById("cubeData").value; // Получение данных из поля ввода
    const cubes = parseCubeData(cubeData);  // Парсинг данных о кубах
    const cubeArray = []; // Массив для хранения кубов

    // Создание объектов ColoredCube и добавление их в массив
    cubes.forEach(cube => {
        const newCube = new ColoredCube(cube.size, cube.color);
        newCube.addCube(cubeArray, newCube); // Добавление куба в массив
    });

    const coloredCube = new ColoredCube(); // Создаем экземпляр для вызова методов
    const result = coloredCube.countAndVolume(cubeArray); // Подсчитываем количество и объем кубов

    const outputDiv = document.getElementById("output");
    coloredCube.displayAllCubes(cubeArray);

    outputDiv.innerHTML += `
        <hr>
        <strong>Количество кубиков по цветам:</strong><br>
        Красный: ${result.colorCount.red}, Желтый: ${result.colorCount.yellow}, 
        Синий: ${result.colorCount.blue}, Зеленый: ${result.colorCount.green}<br>
        <strong>Суммарный объем кубиков:</strong> ${result.totalVolume} см³
    `;
}

// Функция для парсинга строки данных о кубах
function parseCubeData(data) {
    return data.split(';').map(cube => { // Разделение строки на отдельные кубы
        const [size, color] = cube.split(','); // Разделение данных о размере и цвете
        return { 
            size: parseFloat(size.trim()), // Преобразуем размер в число и удаляем лишние пробелы
            color: color.trim()  // Убираем лишние пробелы вокруг цвета
        };
    });
}

document.getElementById("cubeForm").onsubmit = handleFormSubmission;
