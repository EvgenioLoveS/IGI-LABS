// oop_class.js - Реализация с использованием классов 

class Cube {
    constructor(size) {
        this.size = size;
    }

    // Геттер для длины ребра
    get size() {
        return this._size;
    }

    // Сеттер для длины ребра
    set size(value) {
        if (value <= 0) throw new Error("Size must be positive");
        this._size = value;
    }

    volume() {
        return Math.pow(this.size, 3);
    }
}

class ColoredCube extends Cube {
    constructor(size, color) {
        super(size);
        this.color = color;
    }

     // Геттер для цвета
    get color() {
        return this._color;
    }

    // Сеттер для цвета
    set color(value) {
        this._color = value;
    }

    addCube(cubeArray, cube) {
        cubeArray.push(cube); // Добавляем кубик в массив
    }

    displayAllCubes(cubeArray) {
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = ""; // Очистка перед выводом

        cubeArray.forEach(cube => {
            outputDiv.innerHTML += `<p>Размер: ${cube.size} см, Цвет: ${cube.color}, Объем: ${cube.volume()} см³</p>`;
        });
    }

    countAndVolume(cubeArray) {
        const colorCount = { red: 0, yellow: 0, blue: 0, green: 0 }; // Подсчет кубиков по цветам
        let totalVolume = 0; // Переменная для подсчета суммарного объема

        cubeArray.forEach(cube => {
            colorCount[cube.color]++; // Увеличиваем счетчик для каждого цвета
            totalVolume += cube.volume(); // Добавляем объем кубика к общему
        });

        return { colorCount, totalVolume };
    }
}

function handleFormSubmission(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы
    const cubeData = document.getElementById("cubeData").value;
    const cubes = parseCubeData(cubeData); // Парсим данные кубиков
    const cubeArray = [];

    cubes.forEach(cube => {
        const newCube = new ColoredCube(cube.size, cube.color);  // Создаем новые кубики
        newCube.addCube(cubeArray, newCube); // Добавляем кубик в массив
    });

    const coloredCube = new ColoredCube();
    const result = coloredCube.countAndVolume(cubeArray); // Получаем результаты подсчета

    const outputDiv = document.getElementById("output");
    coloredCube.displayAllCubes(cubeArray); // Отображаем все кубики

    outputDiv.innerHTML += `
        <hr>
        <strong>Количество кубиков по цветам:</strong><br>
        Красный: ${result.colorCount.red}, Желтый: ${result.colorCount.yellow}, 
        Синий: ${result.colorCount.blue}, Зеленый: ${result.colorCount.green}<br>
        <strong>Суммарный объем кубиков:</strong> ${result.totalVolume} см³
    `;
}

function parseCubeData(data) {
    // Разделяем строку по символу ";" на отдельные элементы
    return data.split(';').map(cube => {
        // Разделяем каждый элемент массива по запятой (",") на два значения:
        const [size, color] = cube.split(',');
        return { 
            size: parseFloat(size.trim()), // Преобразуем размер в число и удаляем лишние пробелы
            color: color.trim() // Убираем лишние пробелы вокруг цвета
        };
    });
}

document.getElementById("cubeForm").onsubmit = handleFormSubmission;
