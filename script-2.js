
function toggleMenu() {
    var items = document.getElementById('nav-items');
    var hamburger = document.getElementById('menu-icon');
    var cross = document.getElementById('exit-icon');
    var name = document.getElementById('site-name');
    var blur = document.getElementById('blur');
    if (items.className.includes('hidden')) {
        // expand
        items.classList.remove('hidden');
        cross.classList.remove('hidden');
        items.classList.add('visible');
        cross.classList.add('visible');
        hamburger.classList.add('hidden');
        name.classList.add('hidden');
        hamburger.classList.remove('visible');
        name.classList.remove('visible');
    } else {
        // collapse
        items.classList.remove('visible');
        cross.classList.remove('visible');
        items.classList.add('hidden');
        cross.classList.add('hidden');
        hamburger.classList.remove('hidden');
        name.classList.remove('hidden');
        hamburger.classList.add('visible');
        name.classList.add('visible');
    }
}

function toggleFocus() {
    var blur = document.getElementById('blur');
    var button = document.getElementById('nav-button');
    var name = document.getElementById('site-name');
    if (blur.className == 'visible trans') {
        blur.classList.remove('trans');
        button.classList.remove('blur');
        name.classList.remove('blur');
    } else {
        blur.classList.add('trans');
        button.classList.add('blur');
        name.classList.add('blur');
    }
}
