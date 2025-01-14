
function toggleMenu() {
    var items = document.getElementById('nav-items');
    var hamburger = document.getElementById('menu-icon');
    var cross = document.getElementById('exit-icon');
    var name = document.getElementById('site-name');
    var blur = document.getElementById('blur');

    if (items.className.includes('hidden')) {
        // expand menu
        cross.classList.remove('hidden');
        hamburger.classList.add('hidden');
        items.classList.remove('hidden');
        name.classList.add('hidden');

        cross.classList.add('show');
        hamburger.classList.remove('show');
        items.classList.add('show');
        name.classList.remove('show');

    } else {
        // collapse menu
        cross.classList.add('hidden');
        hamburger.classList.remove('hidden');
        items.classList.add('hidden');
        name.classList.remove('hidden');

        cross.classList.remove('show');
        hamburger.classList.add('show');
        items.classList.remove('show');
        name.classList.add('show');

    }
}

function toggleFocus() {
    var blur = document.getElementById('blur');
    var header = document.getElementById('header');
    var name = document.getElementById('site-name-container');

    if (blur.className == 'trans') {
        // focus name
        blur.classList.remove('trans');
        header.classList.remove('fadeOut');
        name.classList.remove('fadeOut');
        header.classList.add('fadeIn');
        name.classList.add('fadeIn');
    } else {
        // focus work
        blur.classList.add('trans');
        header.classList.remove('fadeIn');
        name.classList.remove('fadeIn');
        header.classList.add('fadeOut');
        name.classList.add('fadeOut');
    }
}
