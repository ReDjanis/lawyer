'use strict'
// Функция для подгрузки контента
async function loadContent(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        if (!response.ok) throw new Error('Ошибка загрузки');
        const html = await response.text();
        // Вставляем полученный HTML в контейнер
        document.getElementById('content').innerHTML = html;
    } catch (err) {
        document.getElementById('content').innerHTML = '<p>Ошибка загрузки контента.</p>';
    }
}

// Обработчик кликов по ссылкам
document.querySelectorAll('a[data-link]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const url = link.getAttribute('data-link');
        const url2 = link.getAttribute('href');
        // Загружаем контент
        loadContent(url);
        // Обновляем URL без перезагрузки страницы
        history.pushState(null, '', url2);
    });
});

const fragmentMap = {
    '/index.html': '/fragments/index-content.html',
    '/page1.html': '/fragments/page1-content.html',
    '/page2.html': '/fragments/page2-content.html',
};

window.addEventListener('popstate', () => {
    let currentURL = window.location.href;
    if (!currentURL.includes('#')) {
        const fragmentUrl = fragmentMap[location.pathname] || '/fragments/index-content.html';
        loadContent(fragmentUrl);
    }
});

if (location.pathname !== '/' && location.pathname !== '/index.html') {
    const fragmentUrl = fragmentMap[location.pathname] || '/fragments/index-content.html';
    loadContent(fragmentUrl);
}


let header = document.querySelector('.header');

window.addEventListener('scroll', function (e) {
    let scroll = window.pageYOffset || document.documentElement.scrollTop ||
        document.body.scrollTop || 0;
    let height = window.innerHeight * 0.5;
    if (scroll > height) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        header.style.boxShadow = '0 0 3px 0 #2a577e';
    } else {
        header.style.backgroundColor = '';
        header.style.boxShadow = '';
    }
});