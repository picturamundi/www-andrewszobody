
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
    revealSourcedImages();
    galleryOnVisit();
});

// url change trigger

window.addEventListener("hashchange", function () {
    globalThis.galleryMargin = 30;
    // body class 'nav' lets CSS know this is not an initial page load
    document.body.classList.add('nav');
    route();
    window.scrollTo(0, 0);
    galleryOnVisit();
    updateDevice();
    // can’t remember why we need to update the device here…
});

//window resize trigger

window.addEventListener('resize', function () {
    globalThis.galleryMargin = 30;
    updateDevice();
    galleryOnResize();
    if (document.body.classList.contains('popup-mode')) {
        tailorPopupUI();
    }
});


// ---------------------------------------
//  DEVICE
// ---------------------------------------

function updateDevice() {

    document.body.classList.remove('desktop-switch');
    document.body.classList.remove('mobile-switch');

    if (window.innerWidth < 700) {
        if (document.body.classList.contains('desktop')) {
            document.body.classList.add('mobile-switch');
        }
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
    } else {
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

// find the right page based off of the URL

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

    // name the document body
    globalThis.pageName = functionName;
    // console.log('pageName is now ' + functionName);
    document.body.setAttribute('id', pageName);
    markActivePage();
    pageVisit();
}

// activate the relevant page main

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

// track navigation with classes

function pageVisit() {
    var main = document.querySelector('main.active');

    if (main.classList.contains('sleeping')) {
        main.classList.remove('sleeping');
        main.classList.add('first');
        // adding 'first' to the main classlist lets us know this is a first visit to the page
        document.body.classList.add('first');
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

// only show images with valid sources

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

// activate sources for gallery images on current page
// only show images with valid sources
// log number of valid images to pageImgCount variable

function sourceImages() {
    var imgClass = '#' + pageName + '-main img';
    var lazyImgs = document.querySelectorAll(imgClass);
    globalThis[globalThis.pageName + 'ImgCount'] = 0;

    // Loop through each element
    lazyImgs.forEach(function (image) {
        // Get the value of the 'data-src' attribute
        var dataSrc = image.getAttribute('data-src');
        // Set the 'src' attribute to the value of 'data-src'
        image.setAttribute('src', dataSrc);
        image.onload = function () {
            this.classList.remove('inactive');
            this.classList.add('active');
            globalThis[globalThis.pageName + 'ImgCount'] += 1;
        };
        image.onerror = function () {
            this.classList.remove('active');
            this.classList.add('inactive');
        };
    });
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

// TOGGLE POPUP

// call figure popup on click, log the image number

document.addEventListener("DOMContentLoaded", function () {
    const figures = document.querySelectorAll('.figure-wrapper');

    figures.forEach(function (figure) {
        const img = figure.querySelector('.img-container');
        if (img) {
            img.addEventListener('click', function (event) { // For some reason clicks register on the img, not the parent figure
                // convert the figure ID to a number, store it as a variable (e.g. 105)
                var popupIdString = figure.id;
                globalThis.popupId = +popupIdString;
                // figNum is the same as popupID but without the first digit (e.g. 05)
                var figNumString = popupIdString.substring(1);
                globalThis.figNum = +figNumString;
                callPopup();
            });
        }
    });
});

// toggle figcaption for clicked figure (mobile) or clone figure (desktop)

function callPopup() {
    const figure = document.getElementById(popupId);
    const popupImg = figure.querySelector('.img-container');
    const popupCap = figure.querySelector('figcaption');
    const popup = document.getElementById('popup');
    const popupMain = document.getElementById('popup-main');
    const popupFooter = document.getElementById('popup-footer');
    const imgContainer = document.getElementById('img-container');

    // on mobile, callPopup() works as a toggle for .popup-origin
    if (document.body.classList.contains('mobile') && figure.classList.contains('popup-origin')) {
        figure.classList.remove('popup-origin');
    } else {
        figure.classList.add('popup-origin');
        document.body.classList.add('popup-mode');

        // on desktop, .popup-origin is cloned as .popup
        if (document.body.classList.contains('desktop')) {
            popup.classList.remove('loaded');
            const imgCopy = popupImg.cloneNode(true);
            imgContainer.appendChild(imgCopy);
            imgCopy.classList.remove('popup-origin');
            imgCopy.classList.add('popup');
            const capCopy = popupCap.cloneNode(true);
            popupFooter.appendChild(capCopy);

            const imgFile = document.querySelector('#img-container .popup img')
            imgFile.onload = function () {
                // console.log("Image is loaded successfully!");
                popup.classList.add('loaded');
            }

            tailorPopupUI();
        }
    }
}

// fade popup buttons for first and last image

function tailorPopupUI() {
    var popup = document.getElementById('popup');

    if (figNum == globalThis[globalThis.pageName + 'ImgCount']) {
        popup.classList.add('last');
    } else if (popup.classList.contains('last')) {
        popup.classList.remove('last');
    }
    if (figNum == 1) {
        popup.classList.add('first');
    } else if (popup.classList.contains('first')) {
        popup.classList.remove('first');
    }
}


// close popup

function closeCaption() {
    if (document.body.classList.contains('popup-mode')) {
        document.body.classList.remove('popup-mode');
        document.getElementById('popup').classList.remove('loaded');
        document.querySelector('.popup-origin').classList.remove('popup-origin');
        // everything below is a duplicate of removePopup but without the timeout
        if (document.body.classList.contains('popup-mode')) {
            document.querySelector('.popup-origin').classList.remove('popup-origin');
        }
        document.querySelector('#popup-footer figcaption').remove();
        document.querySelector('#popup-main .img-container.popup').classList.add('removed');
        document.querySelector('#popup-main .img-container.popup').classList.remove('popup');
        document.querySelector('#popup-main #img-container .img-container.removed').remove();
    }
}

// remove popup is kept separate from closeCaption since it is also used for cycling through imgs

function removePopup() {
    // console.log('remove popup fired');
    if (document.body.classList.contains('popup-mode')) {
        document.querySelector('.popup-origin').classList.remove('popup-origin');
    }
    document.querySelector('#popup-footer figcaption').remove();
    document.querySelector('#popup-main .img-container.popup').classList.add('removed');
    document.querySelector('#popup-main .img-container.popup').classList.remove('popup');
    setTimeout(function () {
        document.querySelector('#popup-main #img-container .img-container.removed').remove();
    }, 500);
}

// navigate popups

function nextPopup() {
    if (figNum < globalThis[globalThis.pageName + 'ImgCount']) {
        document.querySelector('#popup-main .img-container.popup').classList.add('next');
        globalThis.popupId += 1;
        globalThis.figNum += 1;
        removePopup();
        callPopup();
    }
}

function previousPopup() {
    if (figNum > 1) {
        document.querySelector('#popup-main .img-container.popup').classList.add('previous');
        globalThis.popupId -= 1;
        globalThis.figNum -= 1;
        removePopup();
        callPopup();
    }
}

// popup keybindings

document.addEventListener("keydown", handleKeys);

function handleKeys(event) {
    if (event.key === "Escape") {
        closeCaption();
    } else if (event.key === "ArrowRight") {
        nextPopup();
    } else if (event.key === "ArrowLeft") {
        previousPopup();
    }
}


// TOGGLE MENU

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

// TOGGLE FOCUS

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

// figure out if we need to build the gallery when a page is visited
// on desktop, build on first page visit or if resize has happened since first visit

function galleryOnVisit() {
    if (document.querySelector('main.active').classList.contains('first')) {
        sourceImages();
    }
    if (window.innerWidth > 699) {
        if (document.querySelector('main.active').classList.contains('first') || document.querySelector('main.active').classList.contains('resize-gallery')) {
            measureGallery();
        }
    } else {
        // this insures that mobile galleries aren’t applying heights calculated on desktop before device switch
        const galleryClass = '.gallery.' + pageName;
        const gallery = document.querySelector(galleryClass);
        gallery.style.height = 'fit-content';
    }
}

// decide whether a resize means rebuilding the gallery or not

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
        if (document.body.classList.contains('mobile-switch')) {
            closeCaption();
        }
    } else {
        // close popups when switching devices
        if (document.body.classList.contains('desktop-switch')) {
            closeCaption();
            measureGallery();
        }
        // console.log(pageName + ' gallery height was reset');
        globalThis.galleryMargin = 30;
        measureGallery();
        // console.log('gallery resized for desktop');
    }
}

// wait for all images to be loaded
// then calculate initial single-column gallery height
// then call the setGalleryHeight function

function measureGallery() {

    // remove resize tag from active gallery since the gallery is now being resized
    document.querySelector('main.active').classList.remove('resize-gallery');

    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
        // If no images are on the page, immediately call the callback
        setGalleryHeight();
        // console.log('there were no images');
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
            // console.log('images loaded');

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

// approximate the needed height for a 2-col gallery
// then call checkGalleryHeight to check if the height meets needs

function setGalleryHeight() {

    // Calculate the desired height when in two columns
    const galleryHeight = initialHeight / 2 + galleryMargin;  // Divide by 2 for two columns

    // Apply the new height to the gallery
    gallery.style.setProperty('height', `${galleryHeight}px`);
    // console.log(pageName + " gallery height set to:", galleryHeight);

    // Check if this height works
    checkGalleryHeight();
}

// check if gallery has two columns or nor

function checkGalleryHeight() {
    const galleryClass = '.gallery.' + pageName;
    const gallery = document.querySelector(galleryClass);
    const parent = gallery.parentElement;

    if (gallery.scrollWidth > gallery.clientWidth) {
        globalThis.galleryMargin += 5;
        // console.log(pageName + ' gallery height increased by 5px');
        setGalleryHeight();
    }
}


// ---------------------------------------
// ANIMATIONS
// ---------------------------------------

function blockAnimations() {
    addEventListener('click', (event) => {
        document.body.classList.remove('load');
    }, { once: true });
}