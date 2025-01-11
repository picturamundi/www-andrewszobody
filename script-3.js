
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
        hamburger.classList.remove('visible');
    } else {
        // collapse
        items.classList.remove('visible');
        cross.classList.remove('visible');
        items.classList.add('hidden');
        cross.classList.add('hidden');
        hamburger.classList.remove('hidden');
        hamburger.classList.add('visible');
    }
}
