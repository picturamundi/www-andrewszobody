// address-based page load

//initial load
window.addEventListener('DOMContentLoaded', function () {
    route();
    // assign hash if there is none, this is important for the back button
    if (!window.location.hash) {
        // If no hash exists, add #home to the URL
        window.location.hash = 'home';
    }
});

window.addEventListener("hashchange", function () {
    // body class 'nav' lets CSS know this is not an initial page load
    // so that transition animations can be triggered
    document.body.classList.add('nav');
    if (document.body.classList.contains('menu-expanded')) {
        collapseMenu();
    }
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
    if (document.body.hasAttribute('id')) {
        if (document.body.getAttribute('id') !== 'home') {
            // tag body if on a page (not the home screen)
            document.body.classList.add('page');
            // show images if on a page
            showImages();
            window.addEventListener("hashchange", function () {
                document.body.classList.remove('leave-home');
            });
        } else {
            document.body.classList.remove('page');
            window.addEventListener("hashchange", function () {
                // tag body when we’ve gone from home to page
                document.body.classList.add('leave-home');
            });
        }
    }
    hideMissingImages();
}

// lazy load images

function showImages() {
    var bodyId = document.body.id;
    var imgClass = '.' + bodyId + '-img';
    var lazyImgs = document.querySelectorAll(imgClass);

    // Loop through each element
    lazyImgs.forEach(function (image) {
        // Get the value of the 'data-src' attribute
        var dataSrc = image.getAttribute('data-src');
        // Set the 'src' attribute to the value of 'data-src'
        image.setAttribute('src', dataSrc);
    });
}

// show images that belong to current page
// except for those with a missing source file

function hideMissingImages() {
    var bodyId = document.body.id;
    var imgClass = '.' + bodyId + '-img';
    var lazyImgs = document.querySelectorAll(imgClass);

    lazyImgs.forEach(function (image) {
        image.style.display = 'block';
    });
    document.querySelectorAll('img').forEach(function (img) {
        img.onerror = function () { this.style.display = 'none'; };
    })
}

// page functions

function home() {
    document.body.setAttribute('id', 'home');
}

function recent() {
    document.body.setAttribute('id', 'recent');
}

function less() {
    document.body.setAttribute('id', 'less');
}

function old() {
    document.body.setAttribute('id', 'old');
}

function bio() {
    document.body.setAttribute('id', 'bio');
}

// toggle menu

function toggleMenu() {
    if (document.body.className.includes('menu-expanded')) {
        collapseMenu();
    } else {
        expandMenu();
    }
}

function expandMenu() {
    var menu = document.getElementById('nav-button');
    var body = document.body;

    menu.classList.add('cross');
    body.classList.remove('menu-collapsed');
    body.classList.add('menu-expanded');
    menu.classList.remove('hamburger');
}

function collapseMenu() {
    var menu = document.getElementById('nav-button');
    var body = document.body;

    menu.classList.remove('cross');
    body.classList.remove('menu-expanded');
    menu.classList.add('hamburger');
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

// back button

function backButton() {
    if (history.length > 1) {
        // If there is history to go back to, use history.back()
        history.back();
    } else {
        // Otherwise, redirect to the homepage
        window.location.hash = 'home';
    }
}