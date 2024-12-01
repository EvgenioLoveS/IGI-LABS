    document.addEventListener("DOMContentLoaded", function () {
        const apiUrl = "/api/get-contacts/";
        const addContactUrl = "/api/add-contact/";
        let contactsData = []; // массив для контактов
        let currentPage = 1; // текущая стр
        const rowsPerPage = 3;// кол-во строк на стр
        let currentSortColumn = null; 
        let currentSortDirection = 1; // 1 for ascending, -1 for descending
        const preloader = document.getElementById("preloader");

        // Функция для отображения прелоадера
        function showPreloader() {
            const preloaderContainer = document.getElementById("preloader-container");
            // Перезапуск анимации
            preloaderContainer.classList.remove("hidden");
            void preloaderContainer.offsetWidth; // Триггер перерисовки (перезапуск анимации)
            preloaderContainer.classList.add("shown"); // Добавьте класс для активации анимации
        }
        
        function hidePreloader() {
            const preloaderContainer = document.getElementById("preloader-container");
            // Плавное исчезновение
            preloaderContainer.classList.add("hidden");
            preloaderContainer.classList.remove("shown"); // Убираем активный класс
        }     

        function loadContacts() {
            showPreloader(); // Показать прелоадер
            fetch(apiUrl) // Отправляем GET-запрос
                .then(response => response.json())
                .then(data => {
                    contactsData = data.contacts;
                    displayContacts();
                    updatePaginationControls();
                    hidePreloader(); // Скрыть прелоадер
                });
        }
  
        // Отображение списка контактов
        function displayContacts(filteredContacts = null) {
            const tbody = document.getElementById("contacts-tbody");
            tbody.innerHTML = "";
            const contactsToDisplay = filteredContacts || contactsData;
            const start = (currentPage - 1) * rowsPerPage; // Индекс первого элемента на странице
            const end = start + rowsPerPage; // Индекс последнего элемента на странице
            const pageData = contactsToDisplay.slice(start, end); // Данные для текущей страницы из массива с индекса старт

            pageData.forEach(contact => {
                const row = document.createElement("tr"); // Создаем элемент строки таблицы
                row.innerHTML = `
                    <td>${contact.full_name}</td>
                    <td><img src="${contact.photo_url}" width="50" height="50" alt="Фото контакта"></td>
                    <td>${contact.job_description}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.email}</td>
                    <td><input type="checkbox" class="select-contact"></td>
                `;
                // Сохраняем ID контакта как атрибут строки
                row.dataset.contactId = contact.id;
                tbody.appendChild(row);

                row.addEventListener("click", (event) => {
                    // Проверяем, что клик был не на чекбоксе
                    if (!event.target.classList.contains("select-contact")) {
                        showDetails(contact.id);
                    }
                });
            });
        }
        // Функция для отображения деталей выбранного контакта
        function showDetails(contactId) {
            showPreloader();
            const contact = contactsData.find(c => c.id === contactId); // Поиск контакта по ID
            if (contact) {
                document.getElementById("contact-name-detail").textContent = contact.full_name;
                document.getElementById("contact-phone-detail").textContent = contact.phone;
                document.getElementById("contact-email-detail").textContent = contact.email;
                document.getElementById("contact-description-detail").textContent = contact.job_description;
                document.getElementById("contact-photo-detail").src = contact.photo_url;

                document.getElementById("contact-details").style.display = "block";
            }    
            hidePreloader();
        }

        function filterContacts() {
            showPreloader();
            const filterText = document.getElementById("filter-input").value.toLowerCase(); // Текст фильтра
            const filteredContacts = contactsData.filter(contact => {
                return contact.full_name.toLowerCase().includes(filterText) ||
                    contact.job_description.toLowerCase().includes(filterText) ||
                    contact.phone.toLowerCase().includes(filterText) ||
                    contact.email.toLowerCase().includes(filterText);
            });
            displayContacts(filteredContacts);
            updatePaginationControls(filteredContacts);
            hidePreloader();
        }

        // Функция сортировки таблицы по столбцу
        function sortTable(column) {
            if (currentSortColumn === column) {
                currentSortDirection *= -1; // Меняем направление сортировки
            } else {
                currentSortColumn = column;
                currentSortDirection = 1;
            }

            contactsData.sort((a, b) => {
                const compare = a[column].localeCompare(b[column]); // Сравнение значений
                return compare * currentSortDirection; // Применяем направление сортировки
            });

            displayContacts();
            updatePaginationControls();
            updateSortIcons();
        }

        function updateSortIcons() {
            // Получаем все заголовки таблицы   
            const headers = document.querySelectorAll("th");
            // Удаляем текущие стрелки сортировки из всех заголовков
            headers.forEach(header => {
                const arrow = header.querySelector(".sort-arrow");
                if (arrow) {
                    arrow.remove(); // Удаляем элемент стрелки
                }
            });
            
            // Добавляем стрелку в заголовок текущего столбца сортировки
            if (currentSortColumn) {
                const currentHeader = document.getElementById(`${currentSortColumn}-header`); // Находим текущий заголовок
                const arrow = document.createElement("span");
                arrow.classList.add("sort-arrow");
                arrow.textContent = currentSortDirection === 1 ? "↑" : "↓";
                currentHeader.appendChild(arrow);
            }
        }


        function updatePaginationControls(filteredContacts = null) {
            const paginationControls = document.getElementById("pagination-controls");
            const totalContacts = filteredContacts || contactsData;
            const totalPages = Math.ceil(totalContacts.length / rowsPerPage);
    
            // Обновляем текст отображения текущей страницы
            document.getElementById("page-number").textContent = `Страница ${currentPage} из ${totalPages}`;
    
            // Отключаем кнопки "Назад" и "Вперед" в зависимости от текущей страницы
            document.getElementById("prev-page-btn").disabled = currentPage === 1;
            document.getElementById("next-page-btn").disabled = currentPage === totalPages;
        }

        // Обработчик события для кнопки "Назад"
        document.getElementById("prev-page-btn").addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                showPreloader(); 
                displayContacts();
                updatePaginationControls();
                hidePreloader();
            }
        });
        // Обработчик события для кнопки "Вперед"
        document.getElementById("next-page-btn").addEventListener("click", () => {
            const totalPages = Math.ceil(contactsData.length / rowsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                showPreloader(); 
                displayContacts();
                updatePaginationControls();
                hidePreloader();
            }
        });

        // Обработчик для кнопки "Добавить контакт"
        document.getElementById("add-contact-btn").addEventListener("click", () => {
            const form = document.getElementById("add-contact-form");
            form.style.display = form.style.display === "block" ? "none" : "block";
        });

        // Обработчик для кнопки отправки формы добавления контакта
        document.getElementById("submit-contact").addEventListener("click", () => {
            // Считываем значения из полей формы
            const fullName = document.getElementById("contact-full-name").value;
            const phone = document.getElementById("contact-phone").value;
            const email = document.getElementById("contact-email").value;
            const description = document.getElementById("contact-description").value;
            const photoUrl = document.getElementById("contact-photo-url").value;

            // Проверяем корректность телефона и URL фотографии
            if (!validatePhone(phone) || !validateUrl(photoUrl)) {
                document.getElementById("validation-message").textContent = "Ошибка валидации!";
                return;
            }
            // debug
            console.log("Full Name:", fullName);
            console.log("Phone:", phone);
            console.log("Email:", email);
            console.log("Description:", description);
            console.log("Photo URL:", photoUrl);

            // Создаем объект контакта для отправки на сервер
            const contact = { 
                full_name: fullName,
                phone: phone,
                email: email,
                job_description: description,
                photo_url: photoUrl
            };

            showPreloader();

            console.log("Отправка запроса", contact);
            // Отправляем POST-запрос для добавления контакта
            fetch(addContactUrl, {
                method: "POST", // HTTP метод
                headers: { "Content-Type": "application/json" }, // Заголовки запроса
                body: JSON.stringify(contact), // Тело запроса в формате JSON
            })
                .then(response => response.json()) // Преобразуем ответ сервера в JSON
                .then(data => {
                    console.log("Данные из ответа:", data);
                    // Если сервер вернул ошибки
                    if (data.errors) {
                        document.getElementById("validation-message").textContent = `Ошибка: ${JSON.stringify(data.errors)}`;

                    } else {
                        // loadContacts();
                        // Если контакт успешно добавлен, обновляем массив данных контактов
                        contactsData.push(data.contact);
                        displayContacts(); // Обновляем таблицу
                        updatePaginationControls(); // Обновляем пагинацию


                        // Очистить форму
                        document.getElementById("contact-full-name").value = "";
                        document.getElementById("contact-phone").value = "";
                        document.getElementById("contact-email").value = "";
                        document.getElementById("contact-description").value = "";
                        document.getElementById("contact-photo-url").value = "";
                        document.getElementById("validation-message").textContent = "";

                         // Скрываем форму добавления контакта
                        document.getElementById("add-contact-form").style.display = "none";
                    }
                });
                hidePreloader();
        });

        //Шаблон охватывает номера телефонов в Беларуси, поддерживая три основных формата:
        //Номера с кодом 80 или +375, разделенные дефисами, пробелами или без разделителей.
        //Локальные номера, начинающиеся с 8, с кодом региона из 3 цифр.
        //Номера с кодом 80 или +375 и 7-значным номером без дополнительных разделителей.
        function validatePhone(phone) {
            const phonePattern = /^(80|\+375)\s?\(?\d{2,3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$|^(8)\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$|^(80|\+375)\s?\(?\d{2,3}\)?\s?\d{7}$/;
            const isValid = phonePattern.test(phone);
            document.getElementById("contact-phone").classList.toggle("invalid-input", !isValid);
            return isValid;
        }

        function validateUrl(url) {
            const urlPattern = /^(http:\/\/|https:\/\/).+\.(php|html)$/i;
            const isValid = urlPattern.test(url);
            document.getElementById("contact-photo-url").classList.toggle("invalid-input", !isValid);
            return isValid;
        }

        //Обработчик для кнопки премирования
        document.getElementById("premiate-btn").addEventListener("click", function () {
            showPreloader(); 
        
            const selectedContacts = [];
        
            // Сбор фамилий выбранных сотрудников
            const checkboxes = document.querySelectorAll(".select-contact:checked"); 
            checkboxes.forEach(checkbox => {
                const row = checkbox.closest("tr"); 
                const fullName = row.querySelector("td").textContent;  
                selectedContacts.push(fullName);
            });

            // Генерация текста премирования
            const messageDiv = document.getElementById("premiate-message");
            if (selectedContacts.length > 0) {
                messageDiv.textContent = `Премированы сотрудники: ${selectedContacts.join(", ")}`;
            } else {
                messageDiv.textContent = "Не выбраны сотрудники для премирования.";
            }

            hidePreloader();
        });  

        document.getElementById("filter-btn").addEventListener("click", filterContacts);
        document.getElementById("name-header").addEventListener("click", () => sortTable('full_name'));
        document.getElementById("description-header").addEventListener("click", () => sortTable('job_description'));
        document.getElementById("phone-header").addEventListener("click", () => sortTable('phone'));
        document.getElementById("email-header").addEventListener("click", () => sortTable('email'));

        loadContacts();  

    });  

