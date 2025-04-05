
// TO DO LIST
//      - Empty!


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
    determineDevice();
    populateCaptions();
    route();
    galleryOnVisit();
    addPopupListener();
});

// url change trigger

window.addEventListener("hashchange", function () {
    globalThis.galleryMargin = 30;
    // body class 'nav' lets CSS know this is not an initial page load
    document.body.classList.add('nav');
    window.scrollTo(0, 0);
    determineDevice();
    route();
    galleryOnVisit();
    refreshPopupListener();
    // can’t remember why we need to update the device here…
});

//window resize trigger

window.addEventListener('resize', function () {
    globalThis.galleryMargin = 30;
    determineDevice();
    galleryOnResize();
    // buildGallery();
    if (document.body.classList.contains('popup-mode')) {
        tailorPopupUI();
    }
});

// ---------------------------------------
//  DEVICE
// ---------------------------------------

function determineDevice() {

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

// source images is using a system of promises to ensure all images are loaded before math is executed

function sourceImages() {
    var imgClass = '#' + pageName + '-main img';
    var lazyImgs = document.querySelectorAll(imgClass);
    imgCount = 0;
    imgError = 0;
    let promises = [];

    // Loop through each element
    lazyImgs.forEach(function (image) {
        imgCount++;

        // Create a promise to handle each image loading
        let promise = new Promise((resolve, reject) => {
            // Get the value of the 'data-src' attribute
            var dataSrc = image.getAttribute('data-src');
            // Set the 'src' attribute to the value of 'data-src'
            image.setAttribute('src', dataSrc);

            // Image loaded successfully
            image.onload = function () {
                resolve();
            };

            // Image failed to load
            image.onerror = function () {
                imgError++;
                this.classList.add('inactive');
                resolve(); // Resolve even if there's an error, to continue processing
            };
        });

        // Add the promise to the array of promises
        promises.push(promise);
    });

    // Once all images are processed, calculate the page image count
    Promise.all(promises).then(() => {
        pageImgCount = imgCount - imgError;
        globalThis[globalThis.pageName + 'ImgCount'] = pageImgCount / 2;
        // console.log(globalThis[globalThis.pageName + 'ImgCount']);
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

function refreshPopupListener() {
    removePopupListener();
    addPopupListener();
}

function addPopupListener() {
    const popupImg = document.querySelectorAll('main.active img');

    // Loop through each image and add the click event listener
    popupImg.forEach(image => {
        image.addEventListener('click', choosePopup);
    });
    // console.log('added popup listener!');
}

// Separate function to remove the listeners
function removePopupListener() {
    const popupImg = document.querySelectorAll('main.active img');

    // Loop through each image and remove the click event listener
    popupImg.forEach(image => {
        image.removeEventListener('click', choosePopup);
    });
    // console.log('removed popup listener!');
}

// Define the popup listener function
function choosePopup(event) {
    // console.log('popup clicked!');
    var popupIdString = this.closest('.figure-wrapper').id;
    var popupIdNum = popupIdString.substring(1);
    globalThis.popupId = +popupIdNum;
    var figNumString = popupIdString.substring(2);
    globalThis.figNum = +figNumString;
    callPopup();
}



// toggle figcaption for clicked figure (mobile) or clone figure (desktop)

function callPopup() {
    const figure = document.getElementById('a' + popupId);
    const popupImg = figure.querySelector('.img-container');
    const popupCap = figure.querySelector('figcaption');
    const popup = document.getElementById('popup');
    const popupFooter = document.getElementById('popup-footer');
    const imgContainer = document.getElementById('img-container');

    // console.log('popup ' + popupId + ' called');

    // on mobile, callPopup() works as a toggle for .popup-origin
    if (document.body.classList.contains('mobile')) {
        if (figure.classList.contains('popup-origin')) {
            figure.classList.remove('popup-origin');
        } else {
            figure.classList.add('popup-origin');
        }
        // on desktop, .popup-origin is cloned as .popup
    } else {
        figure.classList.add('popup-origin');
        document.body.classList.add('popup-mode');
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
        // document.querySelector('#popup-main .img-container.popup').classList.add('removed');
        // document.querySelector('#popup-main .img-container.popup').classList.remove('popup');
        document.querySelector('#popup-main #img-container .img-container.popup').remove();
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
    // popupImg.classList.remove('oops');

    if (figNum < globalThis[globalThis.pageName + 'ImgCount']) {
        document.querySelector('#popup-main .img-container.popup').classList.add('next');
        globalThis.popupId += 1;
        globalThis.figNum += 1;
        removePopup();
        callPopup();
    } else {
        oops();
    }
}

function previousPopup() {

    if (figNum > 1) {
        document.querySelector('#popup-main .img-container.popup').classList.add('previous');
        globalThis.popupId -= 1;
        globalThis.figNum -= 1;
        removePopup();
        callPopup();
    } else {
        oops();
    }
}

function oops() {
    const popupImg = document.querySelector('#popup-main .img-container.popup');
    popupImg.style.animation = ""; // Remove the animation
    popupImg.offsetHeight; // Trigger reflow to restart the animation
    popupImg.style.animation = "oops 0.3s"; // Reapply the animation    }
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
// GALLERIES
// ---------------------------------------

function populateCaptions() {
    Object.keys(captions).forEach(group => {
        const groupData = captions[group];

        Object.keys(groupData).forEach(figureId => {
            const captionData = groupData[figureId];

            const titleElement = document.querySelector(`#${figureId} .fig-title`);
            const mediumElement = document.querySelector(`#${figureId} .fig-medium`);
            const dimensionsElement = document.querySelector(`#${figureId} .fig-dimensions`);

            // Populate each element with data from the captions JSON
            if (titleElement) {
                titleElement.innerText = captionData['title'];
            }
            if (mediumElement) {
                mediumElement.innerText = captionData['medium'];
            }
            if (dimensionsElement) {
                dimensionsElement.innerText = captionData['dimensions'];
            }
        });
    });
}

function galleryOnVisit() {
    const gallery = document.querySelector('main.active .gallery');
    const body = document.body;

    // switching to mobile removes the desktop gallery (without removal, duplicate IDs cause issues)

    if (body.classList.contains('mobile-switch')) {
        destroyGallery();
    }

    if (gallery.classList.contains('first') || document.body.classList.contains('desktop-switch')) {
        if (window.innerWidth > 699) {
            buildGallery();
            sourceImages();
        } else {
            sourceImages();
        }
    }
}

// build gallery only if this is a first visit on desktop

function buildGallery() {

    // Get all divs in the document
    const figs = document.querySelectorAll('.' + pageName + ' .figure-wrapper');

    // Get the containers where the divs will be cloned
    const col1 = document.querySelector('.' + pageName + ' .gal-col-1'); // Container for odd ID divs
    const col2 = document.querySelector('.' + pageName + ' .gal-col-2'); // Container for odd ID divs

    figs.forEach(fig => {
        // Check if the div ID is a number and if it's odd or even
        const idName = fig.id;
        const idNumber = idName.substring(1);

        if (!isNaN(idNumber)) {
            if (idNumber % 2 === 0) {
                // If ID number is even, clone to container 2
                col2.appendChild(fig.cloneNode(true)); // Append cloned version to col2
            } else {
                // If ID number is odd, clone to container 1
                col1.appendChild(fig.cloneNode(true)); // Append cloned version to col1
            }
        }
    });
    document.querySelector('main.active .gallery').classList.remove('first');
}

function destroyGallery() {
    const galCols = document.body.querySelectorAll('.gal-col');
    galCols.forEach(galCol => {
        galCol.innerHTML = '';
    });
}


function galleryOnResize() {

    if (document.body.classList.contains('mobile-switch')) {
        closeCaption();
        galleryOnVisit();
        refreshPopupListener();
    }
    if (document.body.classList.contains('desktop-switch')) {
        closeCaption();
        const galleries = document.querySelectorAll('.page');

        galleries.forEach(gallery => {
            gallery.classList.add('first');
        });
        galleryOnVisit();
        refreshPopupListener();
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