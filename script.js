
function toggleMenu() {
    var items = document.getElementById('nav');
    var hamburger = document.getElementById('menu-icon');
    var cross = document.getElementById('exit-icon');
    var name = document.getElementById('site-name');

    if (items.className.includes('hide')) {
        // expand menu
        cross.classList.remove('hide');
        hamburger.classList.add('hide');
        items.classList.remove('hide');
        name.classList.add('hide');

        cross.classList.add('show');
        hamburger.classList.remove('show');
        items.classList.add('show');
        name.classList.remove('show');

    } else {
        // collapse menu
        cross.classList.add('hide');
        hamburger.classList.remove('hide');
        items.classList.add('hide');
        name.classList.remove('hide');

        cross.classList.remove('show');
        hamburger.classList.add('show');
        items.classList.remove('show');
        name.classList.add('show');

    }
}

function toggleFocus() {
    var glass = document.getElementById('glass');
    var header = document.getElementById('nav-button');
    var name = document.getElementById('site-name-container');
    var items = document.getElementById('nav');
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
