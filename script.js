// TO DO LIST
//      - if a page doesn't exist, navigate to home

// CONTENTS
//
// - Window triggers
// - Device
// - Pseudo pages
// - User interface
// - Wallpapers and galleries
// - Animations


// ---------------------------------------
//  WINDOW TRIGGERS
// ---------------------------------------

// page load trigger

window.addEventListener('DOMContentLoaded', function () {
    route(); // navigate to the right page based on URL
    determineDevice(); // add mobile and desktop classes to body
    chooseWallpaper(); // hide inactive wallpapers
    buildGallery(); // inject gallery for active page
    enableAnimations(); // …after user clicks
});

// url change trigger

window.addEventListener("hashchange", function () {
    document.body.classList.add('nav');
    window.scrollTo(0, 0);
    route();
    buildGallery();
});

//window resize trigger

window.addEventListener('resize', function () {
    determineDevice();
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
            location.reload();
        }
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
    } else {
        if (document.body.classList.contains('mobile')) {
            document.body.classList.add('desktop-switch');
            location.reload();
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
    if (document.body.classList.contains('menu-expanded')) {
        collapseMenu();
    }
    // If no hash exists, add #home to the URL (for navigating back)
    if (!window.location.hash) {
        window.location.hash = 'home';
    }

    checkNonexistentPage();

    function checkNonexistentPage() {
        var hash = window.location.hash;
        var functionName = hash.substring(1);

        if (!document.getElementById('link-' + functionName)) {

            window.location.hash = 'home';
        }
    }

    // set body ID and pageName var
    var hash = window.location.hash;
    var functionName = hash.substring(1);
    globalThis.pageName = functionName;
    document.body.setAttribute('id', pageName);
    markActivePage();
    trackPageVisits();
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

function trackPageVisits() {
    var main = document.querySelector('main.active');

    if (main.classList.contains('sleeping')) {
        main.classList.remove('sleeping');
        main.classList.add('first');
    } else {
        if (main.classList.contains('first')) {
            main.classList.remove('first');
        }
    }
    if (document.body.getAttribute('id') == 'home' || document.body.getAttribute('id') == 'bio') {
        // tag body if on a page (white bg)
        document.body.classList.remove('page');
        window.addEventListener('hashchange', function () {
            // tag body when we’ve left from the home to page (for instagram animation)
            document.body.classList.add('leave-home');
        });
    } else {
        document.body.classList.add('page');
        window.addEventListener('hashchange', function () {
            document.body.classList.remove('leave-home');
        });
    }
}

// navigate back with arrow

function backButton() {
    if (pageName != 'home') {
        if (history.length > 1) {
            // If there is a history, go back to previous page
            history.back();
        } else {
            // If no history, redirect to the homepage
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
    popupImg.forEach(image => {
        image.addEventListener('click', choosePopup);
    });
}

function removePopupListener() {
    const popupImg = document.querySelectorAll('main.active img');
    popupImg.forEach(image => {
        image.removeEventListener('click', choosePopup);
    });
}

// mark the popup chosen via the listener

function choosePopup(event) {
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
            popup.classList.add('loaded');
        }
        adjustPopupUI();
    }
}

// fade popup buttons for first-img and last-img

function adjustPopupUI() {
    var popup = document.getElementById('popup');

    if (figNum == globalThis[globalThis.pageName + 'ImgCount']) {
        popup.classList.add('last-img');
    } else if (popup.classList.contains('last-img')) {
        popup.classList.remove('last-img');
    }
    if (figNum == 1) {
        popup.classList.add('first-img');
    } else if (popup.classList.contains('first-img')) {
        popup.classList.remove('first-img');
    }
}

// close popup

function closeCaption() {
    if (document.body.classList.contains('popup-mode')) {
        document.body.classList.remove('popup-mode');
        document.getElementById('popup').classList.remove('loaded');
        document.querySelector('.popup-origin').classList.remove('popup-origin');
        if (document.body.classList.contains('popup-mode')) {
            document.querySelector('.popup-origin').classList.remove('popup-origin');
        }
        document.querySelector('#popup-footer figcaption').remove();
        document.querySelector('#popup-main #img-container .img-container.popup').remove();
    }
}

// removePopup is kept separate from closeCaption because it is used for cycling through imgs
// hence the 500ms timeout (for cross fade animations)

function removePopup() {
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

// animate first-img and last-img when user tries to navigate beyond

function oops() {
    const popupImg = document.querySelector('#popup-main .img-container.popup');
    popupImg.style.animation = ''; // Remove the animation
    popupImg.offsetHeight; // Trigger reflow to restart the animation
    popupImg.style.animation = 'oops 0.3s'; // Reapply the animation
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


// TOGGLE MENU (mobile)

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

    menu.classList.remove('hamburger');
    menu.classList.add('cross');
    body.classList.remove('menu-collapsed');
    body.classList.add('menu-expanded');
}

function collapseMenu() {
    var menu = document.getElementById('nav-button');
    var body = document.body;

    menu.classList.remove('cross');
    menu.classList.add('hamburger');
    body.classList.remove('menu-expanded');
    body.classList.add('menu-collapsed');
}

// TOGGLE FOCUS (mobile)

function toggleFocus() {
    if (document.body.classList.contains('focus-work')) {
        // focus name
        document.body.classList.add('focus-name');
        document.body.classList.remove('focus-work');
    } else {
        // focus work
        document.body.classList.remove('focus-name');
        document.body.classList.add('focus-work');
    }
}


// ---------------------------------------
// WALLPAPERS AND GALLERIES
// ---------------------------------------

// hide inactive wallpapers

function chooseWallpaper() {
    var backgrounds = document.querySelectorAll('#wallpaper-wrapper img');
    backgrounds.forEach(function (image) {
        image.onerror = function () {
            this.classList.add('inactive');
        };
    });
}

function buildGallery() {

    if (document.body.classList.contains('page') && document.querySelector('main.active').classList.contains('first')) {
        const main = document.querySelector('main.active')
        const gallery = document.querySelector('main.active div.gallery');
        let galleryNumber;

        if (pageName == 'recent') {
            galleryNumber = 1;
        } else if (pageName == 'less') {
            galleryNumber = 2;
        } else if (pageName == 'old') {
            galleryNumber = 3;
        } else if (pageName == 'g4') {
            galleryNumber = 4;
        }

        let html = '';

        for (let i = 1; i <= 15; i++) {
            const idNumber = i.toString().padStart(2, '0');
            html += `
                <div id="a${galleryNumber}${idNumber}" class="figure-wrapper">
                    <figure>
                        <div class="img-container">
                            <img src="artwork/${pageName}/${idNumber}.jpeg">
                        </div>
                        <figcaption>
                            <div class="fig-title"></div>
                            <div class="fig-details">
                                <div class="fig-medium"></div>
                                <div class="fig-dimensions"></div>
                            </div>
                        </figcaption>
                    </figure>

                </div>`;
        }

        gallery.innerHTML += html;

        populateCaptions();

        if (document.querySelector('main.active').classList.contains('first')) {
            addPopupListener();
        } else {
            refreshPopupListener();
        }

        // mobile vs desktop
        if (window.innerWidth > 699 && document.body.classList.contains('page') && main.classList.contains('first')) {
            arrangeDesktopGallery();
        }
        activateGalleryImgs();
    }
}

// activate valid gallery images, count them

function activateGalleryImgs() {
    var lazyImgs = document.querySelectorAll('main.active img');
    imgCount = 0;
    imgLoad = 0;

    // Loop through each element
    lazyImgs.forEach(function (image) {
        imgCount++;
        // Image loaded successfully
        image.onload = function () {
            this.classList.add('active');
            imgLoad++;
            globalThis[globalThis.pageName + 'ImgCount'] = imgLoad;
        };
    });
}

// pull captions from captions.js file

function populateCaptions() {
    Object.keys(captions).forEach(group => {
        const groupData = captions[group];

        Object.keys(groupData).forEach(figureId => {
            const captionData = groupData[figureId];

            const titleElement = document.querySelector(`main.active #${figureId} .fig-title`);
            const mediumElement = document.querySelector(`main.active #${figureId} .fig-medium`);
            const dimensionsElement = document.querySelector(`main.active #${figureId} .fig-dimensions`);

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

// arrange gallery images in two columns for desktop

function arrangeDesktopGallery() {

    const figs = document.querySelectorAll('.' + pageName + ' .figure-wrapper');
    const col1 = document.querySelector('.' + pageName + ' .gal-col-1'); // Container for odd ID divs
    const col2 = document.querySelector('.' + pageName + ' .gal-col-2'); // Container for odd ID divs

    figs.forEach(fig => {
        // Check if the div ID is a number and if it's odd or even
        const idName = fig.id;
        const idNumber = idName.substring(1);

        if (!isNaN(idNumber)) {
            if (idNumber % 2 === 0) {
                // If ID number is even, clone to container 2
                col2.appendChild(fig);
            } else {
                // If ID number is odd, clone to container 1
                col1.appendChild(fig);
            }
        }
    });
}

// ---------------------------------------
// ANIMATIONS
// ---------------------------------------

function enableAnimations() {
    addEventListener('click', (event) => {
        document.body.classList.remove('load');
    }, { once: true });
}