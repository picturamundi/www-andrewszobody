
function toggleMenu() {
    var items = document.getElementById('nav-items');
    var hamburger = document.getElementById('menu-icon');
    var cross = document.getElementById('exit-icon');
    var name = document.getElementById('site-name');
    var blur = document.getElementById('blur');
    if (items.className.includes('hidden')) {
        // expand
        items.className = 'visible';
        cross.className = 'visible';
        hamburger.className = 'hidden';
        name.className = 'hidden';
        // blur.className = 'visible';
    } else {
        // collapse
        items.className = 'hidden';
        cross.className = 'hidden';
        hamburger.className = 'visible';
        name.className = 'visible';
        // blur.className = 'hidden';
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
