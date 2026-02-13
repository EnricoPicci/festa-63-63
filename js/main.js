/**
 * 63-63 Party Website
 * Language toggle, lightbox gallery, and political spectrum animation.
 */

(function () {
    'use strict';

    // =====================
    // Language Toggle
    // =====================
    var langButtons = document.querySelectorAll('.lang-btn');
    var contentIt = document.querySelectorAll('.content-it');
    var contentEn = document.querySelectorAll('.content-en');

    function setLanguage(lang) {
        langButtons.forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        contentIt.forEach(function (el) { el.hidden = lang !== 'it'; });
        contentEn.forEach(function (el) { el.hidden = lang !== 'en'; });
        document.documentElement.lang = lang;

        try { localStorage.setItem('63-63-lang', lang); } catch (e) { /* ignore */ }
    }

    langButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            setLanguage(this.dataset.lang);
        });
    });

    // Restore saved language preference
    try {
        var saved = localStorage.getItem('63-63-lang');
        if (saved === 'en') setLanguage('en');
    } catch (e) { /* ignore */ }

    // =====================
    // Lightbox Gallery
    // =====================
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="">';
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector('img');

    document.querySelectorAll('.gallery-item img').forEach(function (img) {
        img.addEventListener('click', function () {
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.classList.add('active');
        });
    });

    lightbox.addEventListener('click', function () {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            lightboxImg.src = '';
        }
    });
})();
