
function toggleMenu() {
    var items = document.getElementById('nav-list');
    var menu = document.getElementById('nav-button');
    var body = document.body;

    if (items.className.includes('hide')) {
        // expand menu
        menu.classList.add('cross');
        items.classList.remove('hide');
        body.classList.add('menu-expanded');

        menu.classList.remove('hamburger');
        items.classList.add('show');

    } else {
        // collapse menu
        menu.classList.remove('cross');
        items.classList.add('hide');
        body.classList.remove('menu-expanded');

        menu.classList.add('hamburger');
        items.classList.remove('show');
    }
}

function toggleFocus() {
    var glass = document.getElementById('glass');
    var header = document.getElementById('nav-button');
    var name = document.getElementById('site-name-container');
    var items = document.getElementById('nav-list');
    var social = document.getElementById('social');

    if (glass.className == 'trans') {
        // focus name
        glass.classList.remove('trans');

        header.classList.remove('fadeOut');
        name.classList.remove('fadeOut');
        items.classList.remove('fadeOut');
        social.classList.remove('fadeOut');

        header.classList.add('fadeIn');
        name.classList.add('fadeIn');
        items.classList.add('fadeIn');
        social.classList.add('fadeIn');
    } else {
        // focus work
        glass.classList.add('trans');

        header.classList.remove('fadeIn');
        name.classList.remove('fadeIn');
        items.classList.remove('fadeIn');
        social.classList.remove('fadeIn');

        header.classList.add('fadeOut');
        name.classList.add('fadeOut');
        items.classList.add('fadeOut');
        social.classList.add('fadeOut');
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.querySelectorAll('img').forEach(function (img) {
        img.onerror = function () { this.style.display = 'none'; };
    })
});