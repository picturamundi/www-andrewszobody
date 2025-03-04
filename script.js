
// TO DO LIST
//      - empty!


// CONTENTS
//
// - Window triggers
// - Device
// - Pseudo pages
// - User interface
// - Animations


// ---------------------------------------
//  WINDOW TRIGGERS
// ---------------------------------------


//page load trigger
window.addEventListener('DOMContentLoaded', function () {
    globalThis.galleryMargin = 30;
    blockAnimations();
    updateDevice();
    route();
    serveImages();
    galleryOnVisit();
});

// url change trigger
window.addEventListener("hashchange", function () {
    // body class 'nav' lets CSS know this is not an initial page load
    globalThis.galleryMargin = 30;
    document.body.classList.add('nav');
    route();
    serveImages();
    window.scrollTo(0, 0);
    galleryOnVisit();
    // update device so that device switching updates
    updateDevice();
});

//window resize trigger
window.addEventListener('resize', function () {
    // body class 'nav' lets CSS know this is not an initial page load
    globalThis.galleryMargin = 30;
    // console.log('---------- resize!');
    updateDevice();
    // console.log('device updated');
    galleryOnResize();
    tailorPopupUI();
});


// ---------------------------------------
//  DEVICE
// ---------------------------------------

function updateDevice() {
    // Check if the screen width is less than 700px

    document.body.classList.remove('desktop-switch');

    if (window.innerWidth < 700) {
        // Apply 'mobile' class if the screen width is less than 700px
        document.body.classList.add('mobile');
        document.body.classList.remove('desktop');
    } else {
        // Apply 'desktop' class if the screen width is 700px or more
        if (document.body.classList.contains('mobile')) {
            document.body.classList.add('desktop-switch');
        }
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
    }
}


// ---------------------------------------
//  PSEUDO PAGES
// ---------------------------------------

// route() decides which page to load based off of the URL
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
}

// route() calls one of these page functions

function home() {
    globalThis.pageName = 'home';
    document.body.setAttribute('id', 'home');

    markActivePage();
    pageVisit();
}

function recent() {
    globalThis.pageName = 'recent';
    document.body.setAttribute('id', 'recent');

    markActivePage();
    pageVisit();
}

function less() {
    globalThis.pageName = 'less';
    document.body.setAttribute('id', 'less');

    markActivePage();
    pageVisit();
}

function old() {
    globalThis.pageName = 'old';
    document.body.setAttribute('id', 'old');

    markActivePage();
    pageVisit();
}

function g4() {
    globalThis.pageName = 'g4';
    document.body.setAttribute('id', 'g4');

    markActivePage();
    pageVisit();
}

function bio() {
    globalThis.pageName = 'bio';
    document.body.setAttribute('id', 'bio');

    markActivePage();
    pageVisit();
}

function markActivePage() {
    var mainId = '#' + pageName + '-main';
    var linkId = '#' + 'link-' + pageName;
    var main = document.querySelector(mainId);
    var link = document.querySelector(linkId);

    document.querySelectorAll('main').forEach(mainElement => {
        mainElement.classList.remove('active');
    });
    document.querySelectorAll('.menu-item').forEach(mainElement => {
        mainElement.classList.remove('active');
    });

    main.classList.add('active');
    link.classList.add('active');
}

// pageVisit lets us track navigation with CSS by applying tags to stuff

function pageVisit() {
    var main = document.querySelector('main.active');

    if (main.classList.contains('sleeping')) {
        main.classList.remove('sleeping');
        main.classList.add('first');
        document.body.classList.add('first');
        // console.log('---------- FIRST VISIT TO PAGE: ' + pageName);
    } else {
        if (main.classList.contains('first')) {
            main.classList.remove('first');
            document.body.classList.remove('first');
        }
    }
    if (document.body.getAttribute('id') == 'home' || document.body.getAttribute('id') == 'bio') {
        // tag body if on a page (white bg)
        document.body.classList.remove('page');
        window.addEventListener("hashchange", function () {
            // tag body when we’ve left from the home to page (for animations)
            document.body.classList.add('leave-home');
        });
    } else {
        document.body.classList.add('page');
        window.addEventListener("hashchange", function () {
            document.body.classList.remove('leave-home');
        });
    }
}

// load img-sources on current page

function serveImages() {
    sourceImages();
    revealSourcedImages();
}

// activate source for images on current page

function sourceImages() {
    var imgClass = '#' + pageName + '-main img';
    var lazyImgs = document.querySelectorAll(imgClass);

    // Loop through each element
    lazyImgs.forEach(function (image) {
        // Get the value of the 'data-src' attribute
        var dataSrc = image.getAttribute('data-src');
        // Set the 'src' attribute to the value of 'data-src'
        image.setAttribute('src', dataSrc);
    });
}

// show images with valid sources

function revealSourcedImages() {
    document.querySelectorAll('img').forEach(function (img) {
        img.onload = function () {
            this.classList.remove('inactive');
            this.classList.add('active');
        };
        img.onerror = function () {
            this.classList.remove('active');
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
    const figures = document.querySelectorAll('.figure-wrapper');

    figures.forEach(function (figure) {
        const img = figure.querySelector('.img-container');
        if (img) {
            img.addEventListener('click', function (event) { // For some reason clicks register on the img, not the parent figure
                // Change class
                if (figure.classList.contains('popup-origin')) {
                    figure.classList.remove('popup-origin');
                } else {
                    figure.classList.add('popup-origin');
                    if (document.body.classList.contains('desktop')) {
                        // document.getElementById('desktop-content').appendChild(figure);
                        const popupCopy = figure.cloneNode(true);
                        document.getElementById('desktop-content').appendChild(popupCopy);
                        popupCopy.classList.add('popup');
                        styleCloseButton();
                    }
                }
            });
        }
    });
});

function styleCloseButton() {
    var button = document.getElementById('popup-close-wrapper');
    var popupFigure = document.querySelector('.popup figure');

    const buttonCopy = button.cloneNode(true);
    popupFigure.insertBefore(buttonCopy, popupFigure.firstChild);
    // insert the close button in the relevant figure;
    tailorPopupUI();
}

function tailorPopupUI() {
    var caption = document.querySelector('.popup figcaption');
    var img = document.querySelector('.popup figure .img-container img');

    // Make sure popup image is loaded before adapting the UI
    if (img.complete) {
        var imgWidth = img.offsetWidth;
        document.querySelector('.popup #popup-close-wrapper').style.width = imgWidth + 'px';
        caption.style.width = imgWidth + 'px';
    } else {
        img.addEventListener('load', function () {
            var imgWidth = img.offsetWidth;
            document.querySelector('.popup #popup-close-wrapper').style.width = imgWidth + 'px';
            caption.style.width = imgWidth + 'px';
        });
    }
}



function closeCaption() {
    document.querySelector('.popup').remove();
    document.querySelector('.popup-origin').classList.remove('popup-origin');
    // galleryOnResize(); // if resize happened while popup was up, gallery was miscalculated
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

    if (glass.className == 'trans') {
        // focus name
        document.body.classList.add('focus-name');
        document.body.classList.remove('focus-work');
        glass.classList.remove('trans');
    } else {
        // focus work
        document.body.classList.remove('focus-name');
        document.body.classList.add('focus-work');
        glass.classList.add('trans');
    }
}


// ---------------------------------------
// BUILD DESKTOP GALLERIES
// ---------------------------------------

// galleryOnVisit figures out if we need to build the gallery when a page is visited
// on desktop, the gallery is built on first page visit or if resize has happened since first visit

function galleryOnVisit() {
    if (window.innerWidth > 700) {
        if (document.querySelector('main.active').classList.contains('first') || document.querySelector('main.active').classList.contains('resize-gallery')) {
            measureGallery();
        }
    } else {
        // this insures that mobile galleries aren’t applying heights calculated on desktop
        const galleryClass = '.gallery.' + pageName;
        const gallery = document.querySelector(galleryClass);
        gallery.style.height = 'fit-content';
    }
}

// Other than page visits, window resizing is the only other thing that calls measureGallery()

function galleryOnResize() {
    const galleryClass = '.gallery.' + pageName;
    const gallery = document.querySelector(galleryClass);
    const mainClass = '#' + pageName + '-main';
    const main = document.querySelector(mainClass);

    // mark all pages except active page as resized
    document.querySelectorAll('main').forEach(main => {
        main.classList.add('resize-gallery');
    });
    main.classList.remove('resize-gallery');

    if (window.innerWidth < 700) {
        gallery.style.height = 'fit-content';
        // console.log('gallery resized for mobile');
    } else {
        // close popups when switching to desktop
        if (document.body.classList.contains('desktop-switch')) {
            document.querySelectorAll('.popup').forEach(mainElement => {
                mainElement.classList.remove('popup');
            });
        }
        // console.log(pageName + ' gallery height was reset');
        globalThis.galleryMargin = 30;
        measureGallery();
    }
}

// measureGallery() waits for all images to be loaded
// then calculates initial single-column gallery height
// then calls the setGalleryHeight function

function measureGallery() {

    // remove resize tag from active gallery since the gallery is now being resized
    document.querySelector('main.active').classList.remove('resize-gallery');

    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
        // If no images are on the page, immediately call the callback
        setGalleryHeight();
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

            // Make sure gallery is in a single column (there may have been previous page visits)
            gallery.style.height = 'fit-content';
            globalThis.initialHeight = gallery.offsetHeight;

            // console.log(pageName + ' gallery single column height: ' + initialHeight);

            if (!gallery) {
                console.error(pageName + ' gallery element not found');
                return; // Exit if the gallery element isn't found
            }

            setGalleryHeight();
        }
    }
}

// setGalleryHeight approximates the needed height for a 2-col gallery
// then calls checkGalleryHeight to check if the height meets needs

function setGalleryHeight() {

    // Calculate the desired height when in two columns
    const galleryHeight = initialHeight / 2 + galleryMargin;  // Divide by 2 for two columns

    // Apply the new height to the gallery
    gallery.style.setProperty('height', `${galleryHeight}px`);
    console.log(pageName + " gallery height set to:", galleryHeight);

    // Check if this height works
    checkGalleryHeight();
}

// Check if gallery has two columns or nor

function checkGalleryHeight() {
    const galleryClass = '.gallery.' + pageName;
    const gallery = document.querySelector(galleryClass);
    const parent = gallery.parentElement;

    // // Get the width of the gallery (including padding) and its parent element
    // const galleryWidth = gallery.offsetWidth; // Includes padding
    // // console.log('Gallery width is: ' + galleryWidth);
    // const parentWidth = parent.offsetWidth; // Width of the parent (main element)
    // // console.log('Page width is: ' + parentWidth);

    // // Get the margin on the gallery
    // const galleryMarginLeft = parseFloat(window.getComputedStyle(gallery).marginLeft);
    // // console.log('Gallery margin width is: ' + galleryMarginLeft);

    // // Compare the content width of the gallery to the parent's width minus the margin
    // if (galleryWidth > (parentWidth - galleryMarginLeft - galleryMarginLeft + 2)) {
    //     // console.log(pageName + ' gallery has too many columns');
    //     globalThis.galleryMargin += 5;
    //     // console.log(pageName + ' gallery height increased by 5px');
    //     setGalleryHeight();
    // }

    if (gallery.scrollWidth > gallery.clientWidth) {
        globalThis.galleryMargin += 5;
        console.log(pageName + ' gallery height increased by 5px');
        setGalleryHeight();
    }
}


// ---------------------------------------
// ANIMATIONS
// ---------------------------------------

function blockAnimations() {
    addEventListener('click', (event) => {
        console.log('click');
        document.body.classList.remove('load');
    });
}