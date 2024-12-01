document.addEventListener('DOMContentLoaded', function () {
    // Отображаем или скрываем панель управления стилями
    document.getElementById('toggleStyleControl').addEventListener('change', function () {
        const styleControls = document.getElementById('styleControls');
        styleControls.style.display = this.checked ? 'block' : 'none';
    });
});

// Функция для применения пользовательских стилей
function applyStyles() {
    const fontSize = document.getElementById('fontSize').value + 'px';
    const textColor = document.getElementById('textColor').value;
    const bgColor = document.getElementById('bgColor').value;

    // Применение стиля только к элементу с классом privacy
    const privacySection = document.querySelector('.privacy');
    privacySection.style.setProperty('font-size', fontSize, 'important');
    privacySection.style.setProperty('color', textColor, 'important');
    privacySection.style.setProperty('background-color', bgColor, 'important');
    
    // Сохраняем размеры изображений внутри privacy
    privacySection.querySelectorAll('img').forEach(img => {
        img.style.setProperty('width', 'auto', 'important');
        img.style.setProperty('height', 'auto', 'important');
    });
}


