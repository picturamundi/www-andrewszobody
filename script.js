// address-based page load

window.addEventListener('DOMContentLoaded', function () {
    route();
});

window.addEventListener("hashchange", function () {
    // body class 'nav' lets CSS know this is not an initial page load
    // so that transition animations can be triggered
    document.body.classList.add('nav');
    collapseMenu();
    route();
});

function route() {
    // get the hash fragment from the URL
    var hash = window.location.hash;

    // remove the # symbol
    var functionName = hash.substring(1);

    // call the corresponding function
    if (typeof window[functionName] === "function") {
        window[functionName]();
    } else {
        console.log("Function not found");
    }
}

// page functions

function recent() {
    document.body.setAttribute('id', 'recent');
}

function home() {
    document.body.setAttribute('id', 'home');
}

// toggle menu

function toggleMenu() {
    var items = document.getElementById('nav-list');

    if (items.className.includes('hide')) {
        expandMenu();
    } else {
        collapseMenu();
    }
}

function expandMenu() {
    var items = document.getElementById('nav-list');
    var menu = document.getElementById('nav-button');
    var body = document.body;

    menu.classList.add('cross');
    items.classList.remove('hide');
    body.classList.remove('menu-collapsed');
    body.classList.add('menu-expanded');
    menu.classList.remove('hamburger');
    items.classList.add('show');
}

function collapseMenu() {
    var items = document.getElementById('nav-list');
    var menu = document.getElementById('nav-button');
    var body = document.body;

    menu.classList.remove('cross');
    items.classList.add('hide');
    body.classList.remove('menu-expanded');
    menu.classList.add('hamburger');
    items.classList.remove('show');
    body.classList.add('menu-collapsed');
}

// toggle focus

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

// hide missing image icon

document.addEventListener("DOMContentLoaded", function (event) {
    document.querySelectorAll('img').forEach(function (img) {
        img.onerror = function () { this.style.display = 'none'; };
    })
});