// ---------------------------------------
//  WINDOW TRIGGERS
// ---------------------------------------

//initial load trigger
window.addEventListener('DOMContentLoaded', function () {
    globalThis.galleryMargin = 30;
    updateDevice();
    route();
    serveImages();
    galleryOnVisit();
});

// address change trigger
window.addEventListener("hashchange", function () {
    // body class 'nav' lets CSS know this is not an initial page load
    document.body.classList.add('nav');
    route();
    serveImages();
    galleryOnVisit();
});


window.addEventListener('resize', function () {
    // body class 'nav' lets CSS know this is not an initial page load
    console.log('---------- resize!');
    updateDevice();
    resizeGallery();
});


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
        console.log("function not found");
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

    pageVisit();
}

function recent() {
    globalThis.pageName = 'recent';
    document.body.setAttribute('id', 'recent');

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

    pageVisit();
}

function bio() {
    document.body.setAttribute('id', 'bio');
    pageVisit();
}

function pageVisit() {
    var mainId = '#' + pageName + '-main';
    var main = document.querySelector(mainId);

    if (main.classList.contains('sleeping')) {
        main.classList.remove('sleeping');
        main.classList.add('first');
        console.log('---------- FIRST VISIT TO PAGE: ' + pageName);
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
    if (pageName != 'home') {
        if (history.length > 1) {
            // If there is history to go back to, use history.back()
            history.back();
        } else {
            // Otherwise, redirect to the homepage
            window.location.hash = 'home';
        }
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
                console.log('figure clicked');

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


// ---------------------------------------
//  DESKTOP GALLERIES
// ---------------------------------------


// gallery on visit figures out if we need to build the gallery when a page is visited
// We only build the gallery if we’re on desktop and it’s our first page visit

function galleryOnVisit() {
    mainId = '#' + pageName + '-main';
    main = document.querySelector(mainId);

    if (window.innerWidth > 600) {
        if (main.classList.contains('first')) {
            buildGallery();
        }
    }
}

// Other than page visits, window resizing is the only other thing that calls "buildGallery"

function resizeGallery() {
    const galleryClass = '.gallery.' + pageName;
    const gallery = document.querySelector(galleryClass);

    gallery.style.height = 'auto';
    console.log(pageName + ' gallery height was reset');
    globalThis.galleryMargin = 30;
    buildGallery();
}

// buildGallery waits for all images to be loaded
// then calculates initial single-column gallery height
// then calls the adjustGalleryHeight function

function buildGallery() {
    mainId = '#' + pageName + '-main';
    main = document.querySelector(mainId);
    // console.log('our page main is: ' + mainId);

    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
        // If no images are on the page, immediately call the callback
        adjustGalleryHeight();
        console.log('there were no images');
        return;
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

    function checkImageLoad() {
        loadedCount++;
        // if all images loaded…
        if (loadedCount === totalImages) {
            console.log('images loaded');

            // calculate initial gallery height
            globalThis.galleryClass = '.gallery.' + pageName;
            globalThis.gallery = document.querySelector(galleryClass);
            globalThis.initialHeight = gallery.offsetHeight;

            console.log(pageName + ' gallery single column height: ' + initialHeight);

            if (!gallery) {
                console.error(pageName + ' gallery element not found');
                return; // Exit if the gallery element isn't found
            }

            adjustGalleryHeight();
        }
    }
}

// adjustGalleryHeight approximates the needed height for a 2-col gallery
// then calls isGalleryWiderThanParent to check if the height meets needs

function adjustGalleryHeight() {

    // Calculate the desired height when in two columns
    const galleryHeight = initialHeight / 2 + galleryMargin;  // Divide by 2 for two columns

    // Apply the new height to the gallery
    gallery.style.setProperty('height', `${galleryHeight}px`);
    console.log(pageName + " gallery height set to:", galleryHeight);

    // Check if this height works
    isGalleryWiderThanParent();
}

// Check if gallery has two or three columns

function isGalleryWiderThanParent() {
    const galleryClass = '.gallery.' + pageName;
    const gallery = document.querySelector(galleryClass);

    const parent = gallery.parentElement;

    // Get the width of the gallery (including padding) and its parent element
    const galleryWidth = gallery.offsetWidth; // Includes padding
    // console.log('Gallery width is: ' + galleryWidth);
    const parentWidth = parent.offsetWidth; // Width of the parent (main element)
    // console.log('Page width is: ' + parentWidth);

    // Get the margin on the gallery
    const galleryMarginLeft = parseFloat(window.getComputedStyle(gallery).marginLeft);
    // console.log('Gallery margin width is: ' + galleryMarginLeft);

    // Compare the content width of the gallery to the parent's width minus the margin
    if (galleryWidth > (parentWidth - galleryMarginLeft - galleryMarginLeft + 2)) {
        console.log(pageName + ' gallery has too many columns');
        globalThis.galleryMargin += 50;
        console.log(pageName + ' gallery height increased by 50px');
        adjustGalleryHeight();
    } else {
        console.log(pageName + ' gallery has 2 columns');
    }
}