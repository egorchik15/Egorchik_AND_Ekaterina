// Массив с данными фотографий
const photos = [
    {
        id: 1,
        title: "Обнимашки",
        description: "Первое фото, выставленное в историю в инстаграмме",
        category: "portrait",
        date: "24.02.2024",
        filename: "photo3.jpg"
    },
    {
        id: 2,
        title: "Измайловский парк",
        description: "Прогулка, просмотр показа мод, Буся писала в лесу. Буся помнит, что надела платье и Котя сказал: афигеть, ты ахуенная. Помнит как Котя кайфовал, что она была в платье.",
        category: "city",
        date: "19.05.2024",
        filename: "photo2.jpg"
    },
    {
        id: 3,
        title: "Малышарики в студии",
        description: "Наша первая совместная фотосессия",
        category: "portrait",
        date: "09.03.2024",
        filename: "photo1.jpg"
    },
    {
        id: 4,
        title: "Эмоциональный каток",
        description: "Мы нашли короткий путь, забор почти покорился Екатерине, но к сожалению штанина осталась нанизанной на кол. Слезы, крики, радость, счастье. У МЕНЯ ПОРВАНО ОЧКО, ТЫ ХОЧЕШЬ ЧТОБЫ Я В ТАКОМ ВИДЕ КАТАЛАСЬ?",
        category: "nature",
        date: "25.12.2025",
        filename: "photo4.jpg"
    },
    {
        id: 5,
        title: "Самая сексуальная пара",
        description: "Отель, вид, бассейн, завтрак",
        category: "city",
        date: "02.12.2024",
        filename: "photo5.jpg"
    },
    {
        id: 6,
        title: "Ночь, улица, фонарь, аптека",
        description: "Один из первых разов, когда осталась ночевать у меня",
        category: "travel",
        date: "14.01.2024",
        filename: "photo6.jpg"
    },
    {
        id: 7,
        title: "Местный падик",
        description: "Повседневная жизнь в европейском городе.",
        category: "city",
        date: "20.01.2024",
        filename: "photo7.jpg"
    },
    {
        id: 8,
        title: "Казань",
        description: "Первый полет на самолете, первый мини трип",
        category: "travel",
        date: "24.03.2024",
        filename: "photo8.jpg"
    },
    {
        id: 9,
        title: "Загородные вайбсы",
        description: "Повторяли тренды",
        category: "nature",
        date: "28.04.2024",
        filename: "photo9.jpg"
    },
    {
        id: 10,
        title: "Лавки лавки",
        description: "Котя всегда ее скидывал и Буся не понимала почему она ему так нравится. Ей казалось, что есть миллион других фото, но для него она была какая-то особенная что ли. И из-за этого такая ассоциация с этой фотографией",
        category: "nature",
        date: "14.02.2024",
        filename: "photo10.jpg"
    },
    {
        id: 11,
        title: "Остров мечты",
        description: " Буся считает, что это была какая-то первая страсть. Помнит как фоткались в зеркале с жопой, как был ми**т в зале. Потом милое видео как Котя кружил Бусю ",
        category: "city",
        date: "02.05.2024",
        filename: "photo11.jpg"
    },
    {
        id: 12,
        title: "Дача Екатерины Ламчевой/Сауниной",
        description: "Вайбушное фото. Буся прилетела из Америки и они увиделись спустя долгое время. Утром пошли встречать рассвет и Котя как истинный джентельмен подарил ей сирень",
        category: "travel",
        date: "25.05.2025",
        filename: "photo12.jpg"
    },
];

// Элементы DOM
const galleryEl = document.getElementById('gallery');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const imageTitle = document.getElementById('imageTitle');
const imageDescription = document.getElementById('imageDescription');
const imageDate = document.getElementById('imageDate');
const imageCategory = document.getElementById('imageCategory');
const closeModal = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Текущий фильтр и индекс для навигации
let currentFilter = 'all';
let currentImageIndex = 0;
let filteredPhotos = [...photos];

// Функция отрисовки галереи
function renderGallery() {
    galleryEl.innerHTML = '';
    
    filteredPhotos.forEach((photo, index) => {
        const photoEl = document.createElement('div');
        photoEl.className = 'gallery-item ${photo.category}';
        photoEl.dataset.index = index;
        
        photoEl.innerHTML = `
            <img src="images/${photo.filename}" alt="${photo.title}" class="gallery-img">
            <div class="image-caption">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
                <div class="image-tags">
                    <span class="tag">${photo.category === 'nature' ? '🌿 Природа' : 
                                     photo.category === 'city' ? '🏙️ Город' : 
                                     photo.category === 'portrait' ? '👤 Портрет' : '✈️ Путешествия'}</span>
                    <span class="tag">📅 ${photo.date}</span>
                </div>
            </div>
        `;
        
        photoEl.addEventListener('click', () => openModal(index));
        galleryEl.appendChild(photoEl);
    });
}

// Функция фильтрации фотографий
function filterGallery(category) {
    currentFilter = category;
    
    if (category === 'all') {
        filteredPhotos = [...photos];
    } else {
        filteredPhotos = photos.filter(photo => photo.category === category);
    }
    
    renderGallery();
}

// Открытие модального окна
function openModal(index) {
    currentImageIndex = parseInt(index);
    updateModal();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Обновление содержимого модального окна
function updateModal() {
    const photo = filteredPhotos[currentImageIndex];
    
    modalImage.src = 'images/${photo.filename}';
    modalImage.alt = photo.title;
    imageTitle.textContent = photo.title;
    imageDescription.textContent = photo.description;
    imageDate.textContent = photo.date;
    imageCategory.textContent = photo.category === 'nature' ? 'Природа' : 
                               photo.category === 'city' ? 'Город' : 
                               photo.category === 'portrait' ? 'Портрет' : 'Путешествия';
    
    // Показываем/скрываем кнопки навигации
    prevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
    nextBtn.style.display = currentImageIndex < filteredPhotos.length - 1 ? 'block' : 'none';
}

// Навигация по фотографиям
function navigate(direction) {
    if (direction === 'next' && currentImageIndex < filteredPhotos.length - 1) {
        currentImageIndex++;
    } else if (direction === 'prev' && currentImageIndex > 0) {
        currentImageIndex--;
    }
    
    updateModal();
}

// Инициализация фильтров
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Удаляем активный класс у всех кнопок
        filterBtns.forEach(b => b.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        btn.classList.add('active');
        // Фильтруем галерею
        filterGallery(btn.dataset.filter);
    });
});

// Закрытие модального окна при клике на крестик
closeModal.addEventListener('click', closeModalFunc);

// Закрытие модального окна при клике вне изображения
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Навигация по фотографиям в модальном окне
prevBtn.addEventListener('click', () => navigate('prev'));
nextBtn.addEventListener('click', () => navigate('next'));

// Навигация с помощью клавиатуры
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'Escape') closeModalFunc();
        if (e.key === 'ArrowLeft') navigate('prev');
        if (e.key === 'ArrowRight') navigate('next');
    }
});

// Инициализация галереи при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    
    // Если папка images пуста, создаем заглушки
    const img = new Image();
    img.onerror = function() {
        console.log("Изображения не найдены. Используются заглушки.");
        // Можно добавить логику для заглушек
    };
    img.src = "images/photo1.jpg";
});
