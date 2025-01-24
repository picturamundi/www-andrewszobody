// ---------------------------------------
//  WINDOW TRIGGERS
// ---------------------------------------

//initial load trigger
window.addEventListener('DOMContentLoaded', function () {
    updateDevice();
    route();
    serveImages();
    buildGallery();
});

// address change trigger
window.addEventListener("hashchange", function () {
    // body class 'nav' lets CSS know this is not an initial page load
    document.body.classList.add('nav');
    route();
    serveImages();
    buildGallery();
});

window.addEventListener('resize', updateDevice);


// ---------------------------------------
//  DEVICE
// ---------------------------------------

function updateDevice() {
    // Check if the screen width is less than 600px
    if (window.innerWidth < 600) {
        // Apply 'mobile' class if the screen width is less than 600px
        document.body.classList.add('mobile');
        document.body.classList.remove('desktop');
    } else {
        // Apply 'desktop' class if the screen width is 600px or more
        document.body.classList.add('desktop');
        document.body.classList.remove('mobile');
    }
}


// ---------------------------------------
//  PSEUDO PAGES
// ---------------------------------------

// route() loads pages

function route() {

    // collapse the menu when loading pages
    if (document.body.classList.contains('menu-expanded')) {
        collapseMenu();
    }

    // If no hash exists, add #home to the URL (for navigating back)
    if (!window.location.hash) {
        window.location.hash = 'home';
    }
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
            // tag body if on a page (not home screen)
            document.body.classList.add('page');
            window.addEventListener("hashchange", function () {
                document.body.classList.remove('leave-home');
            });
        } else {
            document.body.classList.remove('page');
            window.addEventListener("hashchange", function () {
                // tag body when we’ve left from the home to page (for animations)
                document.body.classList.add('leave-home');
            });
        }
    }
}

// page functions

function home() {
    globalThis.pageName = 'home';
    document.body.setAttribute('id', 'home');
    var main = document.querySelector('#home-main');

    pageVisit();
}

function recent() {
    globalThis.pageName = 'recent';
    document.body.setAttribute('id', 'recent');
    var main = document.querySelector('#recent-main');

    pageVisit();
}

function less() {
    globalThis.pageName = 'less';
    document.body.setAttribute('id', 'less');

    pageVisit();
}

function old() {
    globalThis.pageName = 'old';
    document.body.setAttribute('id', 'old');
    var main = document.querySelector('#old-main');

    pageVisit();
}

function bio() {
    document.body.setAttribute('id', 'bio');
    pageVisit();
}

function pageVisit() {
    var mainId = '#' + pageName + '-main';
    var main = document.querySelector(mainId);
    console.log('our visited page is: ' + mainId);

    if (main.classList.contains('sleeping')) {
        main.classList.remove('sleeping');
        main.classList.add('first');
        console.log('FIRST VISIT TO ' + pageName);
    } else {
        if (main.classList.contains('first')) {
            main.classList.remove('first');
        } else {
            return;
        }
    }
}

// load img-sources on current page

function serveImages() {
    sourceImages();
    revealActiveImages();
}

// activate source for images on current page

function sourceImages() {
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

// show images on current page, hide those with invalid sources

function revealActiveImages() {
    var bodyId = document.body.id;
    var imgClass = '.' + bodyId + '-img';
    var lazyImgs = document.querySelectorAll(imgClass);

    lazyImgs.forEach(function (image) {
        image.style.display = 'block';
        image.classList.remove('inactive');
    });
    document.querySelectorAll('img').forEach(function (img) {
        img.onerror = function () {
            this.style.display = 'none';
            this.classList.add('inactive');
        };
    })
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


// ---------------------------------------
//  USER INTERFACE
// ---------------------------------------

// toggle caption

document.addEventListener("DOMContentLoaded", function () {
    // Select all <figure> elements
    const figures = document.querySelectorAll('figure');

    figures.forEach(function (figure) {
        const img = figure.querySelector('img');
        if (img) {
            // For some reason clicks register on the img, not the parent figure
            img.addEventListener('click', function (event) {
                // Find the caption within the clicked figure
                const caption = figure.querySelector('figcaption');
                console.log('Figure clicked');

                // Change class
                if (caption.classList.contains('show')) {
                    caption.classList.remove('show');
                    figure.classList.remove('popup');
                } else {
                    figure.classList.add('popup');
                    caption.classList.add('show');
                }
            });
        }
    });

});

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


// gallery

function buildGallery() {
    mainId = '#' + pageName + '-main';
    main = document.querySelector(mainId);
    console.log('our page main is: ' + mainId);

    if (main.classList.contains('first')) {
        const images = document.querySelectorAll('img');
        let loadedCount = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
            // If no images are on the page, immediately call the callback
            adjustGalleryHeight();
            console.log('there were no images');
            return;
        }

        function checkImageLoad() {
            loadedCount++;
            if (loadedCount === totalImages) {
                // If all images are loaded, call the provided callback
                console.log('all images loaded');
                adjustGalleryHeight();
            }
        }

        images.forEach(img => {
            if (img.complete) {
                // If the image is already loaded, increment the count
                checkImageLoad();
            } else {
                // Otherwise, listen for the load event
                img.addEventListener('load', checkImageLoad);
                img.addEventListener('error', checkImageLoad); // Optional: handle failed images
            }
        });
    }
}

function adjustGalleryHeight() {
    const galleryClass = '.gallery.' + pageName;
    const gallery = document.querySelector(galleryClass);
    console.log('page gallery is: ' + galleryClass);

    if (!gallery) {
        console.error("Gallery element not found!");
        return; // Exit if the gallery element isn't found
    }

    // Step 1: Calculate initial gallery height in single column (no flex-wrap)
    const initialHeight = gallery.offsetHeight;
    console.log('Initial height: ' + initialHeight);

    // Step 2: Calculate the desired height when in two columns
    const galleryHeight = initialHeight / 2 + 200;  // Divide by 2 for two columns

    // Step 3: Apply the new height to the gallery
    gallery.style.setProperty('height', `${galleryHeight}px`);

    console.log("Gallery height set to:", galleryHeight);
}