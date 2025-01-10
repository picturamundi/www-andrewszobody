
function toggleMenu() {
    var items = document.getElementById('nav-items');
    var hamburger = document.getElementById('menu-icon');
    var cross = document.getElementById('exit-icon');
    if (items.className.includes('hidden')) {
        items.className = 'visible';
        cross.className = 'visible';
        hamburger.className = 'hidden';
    } else {
        items.className = 'hidden';
        cross.className = 'hidden';
        hamburger.className = 'visible';
    }
}