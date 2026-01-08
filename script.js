// Массив с данными фотографий
const photos = [
    {
        id: 1,
        title: "Рассвет в горах",
        description: "Встреча рассвета на высоте 2000 метров. Альпы, Швейцария.",
        category: "nature",
        date: "15.06.2023",
        filename: "photo3.jpg"
    },
    {
        id: 2,
        title: "Измайловский парк",
        description: "Прогулка, просмотр показа мод, Буся писала в лесу",
        category: "city",
        date: "22.08.2024",
        filename: "photo2.jpg"
    },
    {
        id: 3,
        title: "Портрет в студии",
        description: "Наша первая совместная фотосессия",
        category: "portrait",
        date: "09.03.2024",
        filename: "photo1.jpg"
    },
    {
        id: 4,
        title: "Лесная тропа",
        description: "Осенний лес в парке Сочи.",
        category: "nature",
        date: "05.10.2023",
        filename: "photo4.jpg"
    },
    {
        id: 5,
        title: "Архитектура старого города",
        description: "Исторический центр Праги.",
        category: "city",
        date: "12.11.2023",
        filename: "photo5.jpg"
    },
    {
        id: 6,
        title: "Путешествие по островам",
        description: "Бирюзовые воды Мальдивских островов.",
        category: "travel",
        date: "18.12.2023",
        filename: "photo6.jpg"
    },
    {
        id: 7,
        title: "Уличная фотография",
        description: "Повседневная жизнь в европейском городе.",
        category: "city",
        date: "20.01.2024",
        filename: "photo7.jpg"
    },
    {
        id: 8,
        title: "Горный пейзаж",
        description: "Вид на горный хребет Кавказа.",
        category: "nature",
        date: "14.02.2024",
        filename: "photo8.jpg"
    }
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