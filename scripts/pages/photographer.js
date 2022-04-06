import * as profile from "../factories/profile.js";
import * as asideLikes from "../factories/aside.js";
import * as gallery from "../factories/gallery.js";
import * as lightbox from "../factories/lightbox.js";

// Variables for URL
const urlParam = new URL(window.location.href);
const idUrlParam = urlParam.searchParams.get("id");

function getPhotographer() {
  // ****************************************************************************** //
  // ----------------------------------- FETCH ------------------------------------ //
  //******************************************************************************* //

  fetch("data/photographers.json")
    .then((response) => response.json())
    .then((json) => {
      // ------------------------------------------------ Variables //
      // ------------------------------------------------ ********* //
      const main = document.querySelector("main");
      // Variables for JSON datas
      const photographers = json.photographers;
      let medias = json.medias.sort((a, b) => a.likes - b.likes);
      const body = document.querySelector("body");
      // Variables for sorting <select>
      const sortingSelect = document.querySelector("#sorting-label");
      const optionPopularite = document.querySelector("#option-popularite");
      const optionDate = document.querySelector("#option-date");
      const optionTitle = document.querySelector("#option-title");
      // Variable for container gallery
      const galleryContainer = document.querySelector(".gallery-cards");

      // ************************************************************************** //
      // --------------------- DISPLAY PHOTOGRAPHER PROFILE ----------------------- //
      // ************************************************************************** //

      async function photographerProfile() {
        photographers.forEach((photographer) => {
          if (photographer.id == idUrlParam) {
            const photographerModel = profile.profileFactory(photographer);
            photographerModel.getUserProfileDOM();
            // eslint-disable-next-line no-undef
            formContactTitle(photographer);
          }
        });
      }
      photographerProfile();

      // ************************************************************************** //
      // ----------- DISPLAY PHOTOGRAPHER ASIDE (TOTAL LIKES & PRICE) ------------- //
      // ************************************************************************** //
      let asidePrice = [];
      async function photographerAside() {
        photographers.forEach((photographer) => {
          if (photographer.id == idUrlParam) {
            const asideModel = asideLikes.asideFactory(photographer);
            const cardAside = asideModel.getAsideDOM();
            main.appendChild(cardAside);
            asidePrice.push(photographer.price);
          }
        });
      }
      photographerAside();

      // ************************************************************************** //
      // ------------------------------- VARIABLES -------------------------------- //
      // ************************************************************************** //

      // Array containing only photograph medias
      let photographMedias = [];
      photographMedias = photographMedias.sort((a, b) => a.likes - b.likes);
      // Variable <p> containing total likes photographer
      const totalLikesContainer = document.querySelector(".total-likes");
      // Variable for aside container
      const aside = document.querySelector("aside");

      // ************************************************************************** //
      // ----------------- DISPLAY SECTION PHOTOGRAPHER GALLERY ------------------- //
      // ************************************************************************** //

      // ------------------ Generate array with photographer medias //
      // ------------------------------------------------ ********* //

      async function getArrayPhotographerGallery() {
        medias.forEach((media) => {
          if (idUrlParam == media.photographerId) {
            photographMedias.push(media);
          }
        });
      }
      getArrayPhotographerGallery();

      // --------------------------- Function to get images gallery //
      // ------------------------------------------------ ********* //

      async function getImagesGallery() {
        photographMedias.forEach((photographMedia) => {
          const mediaModel = gallery.galleryFactory(photographMedia);
          const galleryCardsDOM = mediaModel.getGalleryCardDOM();
          galleryContainer.appendChild(galleryCardsDOM);
        });
      }

      // ------------------------ Function to calculate total likes //
      // ------------------------------------------------ ********* //

      async function getTotalLikes() {
        let sumLikes = 0;
        for (let i = 0; i < photographMedias.length; i++) {
          sumLikes += photographMedias[i].likes;
          aside.setAttribute(
            "aria-label",
            ` Popularité:
            ${sumLikes} likes, Prix: ${asidePrice[0]}€ par jour`
          );
        }
        totalLikesContainer.innerHTML =
          sumLikes + ' <span class="fas fa-heart"></span>';
      }

      // ------------------------ Function for incrementation likes //
      // ------------------------------------------------ ********* //

      async function incrementLikes() {
        photographMedias.forEach((photographMedia) => {
          let statutLike = false;
          const containerLike = document.getElementById(
            "likes" + photographMedia.id
          );
          containerLike.addEventListener("click", (e) => {
            e.preventDefault();
            let likesMedia = photographMedia.likes;

            if (statutLike == false) {
              photographMedia.likes = likesMedia + 1;
              containerLike.firstChild.classList.add("number-likes");
              containerLike.setAttribute("aria-checked", "true");
              statutLike = true;
              containerLike.firstChild.innerHTML = photographMedia.likes + " ";
            } else {
              photographMedia.likes = likesMedia - 1;
              containerLike.firstChild.classList.remove("number-likes");
              containerLike.setAttribute("aria-checked", "false");
              statutLike = false;
              containerLike.firstChild.innerHTML = photographMedia.likes + " ";
            }
            getTotalLikes();
          });
        });
      }

      // ---------- Function add attribute order for images gallery //
      // ------------------------------------------------ ********* //

      async function addCssOrder() {
        photographMedias.forEach((photographMedia) => {
          const card = document.getElementById("card" + photographMedia.id);
          card.style.order = photographMedias.indexOf(photographMedia);
        });
      }

      // --------------------------------- Generate section gallery //
      // ------------------------------------------------ ********* //

      getImagesGallery();
      addCssOrder();
      incrementLikes();
      getTotalLikes();

      // ************************************************************************** //
      // ------------------------------- VARIABLES -------------------------------- //
      // ************************************************************************** //

      // Variable HEADER page
      const pageHeader = document.querySelector(".page-header");
      const logo = document.querySelector(".page-header > a");
      // Variables profile section
      const mainTitle = document.querySelector("h1");
      const identityInfos = document.querySelector(".identity > div");
      const photoProfile = document.querySelector(".photograph-header > img");
      // Variables for contact form
      const contactButton = document.querySelector(".contact_button");
      const closeContactModal = document.querySelector(".modal > header > img");
      // Variables for sorting filter
      const sortingLabel = document.querySelector(".gallery-sorting > label");
      const select = document.querySelector("#sorting-label");
      // Variables for elements gallery
      const imagesGallery = document.querySelectorAll(".images-gallery");
      const captionsGallery = document.querySelectorAll(
        ".gallery-cards > figure > figcaption > p"
      );
      const likesGallery = document.querySelectorAll(
        ".gallery-cards > figure > figcaption > a"
      );
      // Variables for lightbox modale
      const lightboxModal = document.querySelector(".lightbox_modal");
      const lightboxCard = document.querySelector(".lightbox_card");
      // Array containing elements focused (except modales)
      let arrayTabindexPage = [];

      // ************************************************************************** //
      // ------------- FOCUS ACCESSIBILITY : TABINDEX FOR MAIN PAGE --------------- //
      // ************************************************************************** //

      // Generate array for elements focused section profile + sort //
      // ------------------------------------------------ ********* //

      function construcArrayTabindex() {
        arrayTabindexPage.push(logo);
        arrayTabindexPage.push(mainTitle);
        arrayTabindexPage.push(identityInfos);
        arrayTabindexPage.push(contactButton);
        arrayTabindexPage.push(photoProfile);
        arrayTabindexPage.push(aside);
        arrayTabindexPage.push(sortingLabel);
        arrayTabindexPage.push(select);
      }
      construcArrayTabindex();

      // ----- Function for tabindex focused section profile + sort //
      // ------------------------------------------------ ********* //

      async function getTabindexPage() {
        let n = 0;
        while (n < arrayTabindexPage.length) {
          arrayTabindexPage[n].setAttribute("tabindex", n + 1);
          n++;
        }
      }

      // ------------ Function for tabindex focused section gallery //
      // ------------------------------------------------ ********* //

      async function addTabindexImgGallery() {
        photographMedias.forEach((photographMedia) => {
          const imgIDGallery = document.getElementById(
            "card" + photographMedia.id
          );
          const captionImage = imgIDGallery.childNodes[1].childNodes[0];
          const likeImage = imgIDGallery.childNodes[1].childNodes[1];
          // Tabindex for image gallery
          imgIDGallery.childNodes[0].setAttribute(
            "tabindex",
            photographMedias.indexOf(photographMedia) + 9
          );
          // Tabindex for caption image
          captionImage.setAttribute(
            "tabindex",
            photographMedias.indexOf(photographMedia) + 9
          );
          // Tabindex for likes image
          likeImage.setAttribute(
            "tabindex",
            photographMedias.indexOf(photographMedia) + 9
          );
        });
      }
      // Function for reset tabindex focused section profile + sort //
      // ------------------------------------------------ ********* //

      async function removeTabindexPage(arrElements) {
        arrElements.forEach((element) => {
          element.setAttribute("tabindex", "-1");
        });
      }

      // ------ Function for reset tabindex focused section gallery //
      // ------------------------------------------------ ********* //

      async function removeTabindexImgGallery() {
        photographMedias.forEach((photographMedia) => {
          const imgGallery = document.getElementById(
            "card" + photographMedia.id
          );
          const captionImage = imgGallery.childNodes[1].childNodes[0];
          const likeImage = imgGallery.childNodes[1].childNodes[1];

          imgGallery.childNodes[0].setAttribute("tabindex", "-1");
          captionImage.setAttribute("tabindex", "-1");
          likeImage.setAttribute("tabindex", "-1");
        });
      }
      // --------- Generate tabindex for elements profile & gallery //
      // ------------------------------------------------ ********* //

      getTabindexPage();
      addTabindexImgGallery();

      // - Contact form events with tabindex (on open/close modale) //
      // ------------------------------------------------ ********* //

      contactButton.addEventListener("click", () => {
        removeTabindexPage(arrayTabindexPage);
        removeTabindexImgGallery();
      });
      contactButton.addEventListener("keydown", (e) => {
        if (e.code == "Enter") {
          removeTabindexPage(arrayTabindexPage);
          removeTabindexImgGallery();
        }
      });
      closeContactModal.addEventListener("click", () => {
        getTabindexPage();
        addTabindexImgGallery();
      });
      closeContactModal.addEventListener("keydown", (e) => {
        e.preventDefault();
        if (e.code == "Enter") {
          getTabindexPage();
          addTabindexImgGallery();
        }
      });

      // ------------ Generate style css focus for elements focused //
      // ------------------------------------------------ ********* //

      function focusStyle(elementFocused, classFocus) {
        elementFocused.addEventListener("focus", () => {
          elementFocused.classList.add(classFocus);
        });
        elementFocused.addEventListener("focusout", () => {
          elementFocused.classList.remove(classFocus);
        });
      }

      arrayTabindexPage.forEach((tabindexPage) => {
        focusStyle(tabindexPage, "page-elements_focus");
      });
      imagesGallery.forEach((imgGallery) => {
        focusStyle(imgGallery, "page-elements_focus");
      });
      captionsGallery.forEach((captionGallery) => {
        focusStyle(captionGallery, "page-elements_focus");
      });
      likesGallery.forEach((likeGallery) => {
        focusStyle(likeGallery, "page-elements_focus");
      });

      // ************************************************************************** //
      // --------------------------- DISPLAY LIGHTBOX ----------------------------- //
      // ************************************************************************** //

      async function generateLightbox() {
        // ------------------------------------ Generate medias cards //
        // ------------------------------------------------ ********* //

        // Create Button close modale lightbox
        const lightboxModalButton = document.createElement("button");
        lightboxModalButton.setAttribute("aria-label", "Fermer lightbox");
        lightboxModalButton.setAttribute("tabindex", "-1");
        const lightboxButtonImg = document.createElement("img");
        lightboxButtonImg.setAttribute("src", "./assets/icons/close_brown.svg");
        lightboxButtonImg.setAttribute("alt", "Fermer la lightbox");
        lightboxButtonImg.setAttribute("fill", "red");
        lightboxModalButton.appendChild(lightboxButtonImg);
        lightboxCard.appendChild(lightboxModalButton);

        // Get medias cards (medias + captions & previous/next nav buttons)
        photographMedias.forEach((photographMedia) => {
          const lightboxModele = lightbox.lightboxFactory(photographMedia);
          const lightboxCardsDOM = lightboxModele.getLightboxCardDOM();
          lightboxCard.appendChild(lightboxCardsDOM);
        });

        // -------------------------------- Variables lightbox modale //
        // ------------------------------------------------ ********* //

        // Variable for containers media card
        const imagesLightbox = document.querySelectorAll(
          ".lightbox_card--absolute"
        );
        // Variables for previous/next nav buttons
        const rightButtons = document.querySelectorAll(".right-button");
        const leftButtons = document.querySelectorAll(".left-button");
        // Variable for close button lightbox modale
        const buttonCloseLightbox = document.querySelector(
          ".lightbox_card > button"
        );

        // Array with all medias cards
        let arrayCardsLightbox = [];
        imagesLightbox.forEach((imageLightbox) => {
          arrayCardsLightbox.push(imageLightbox);
        });
        // Array with all right buttons
        let arrayRightButtons = [];
        rightButtons.forEach((rightButton) => {
          arrayRightButtons.push(rightButton);
        });
        // Array with all left buttons
        let arrayLeftButtons = [];
        leftButtons.forEach((leftButton) => {
          arrayLeftButtons.push(leftButton);
        });
        // Array with all elements focused in the active card
        let arrayActiveFocusLightbox = [];

        // Function to construct array containing elements lightbox focused
        function getArrayActiveLightbox(array) {
          let leftBtn = array.childNodes[0];
          let rightBtn = array.childNodes[2];
          let mediaCardLightbox =
            array.childNodes[1].childNodes[0].childNodes[0];
          let captionMedia = array.childNodes[1].childNodes[1];

          arrayActiveFocusLightbox.push(array);
          arrayActiveFocusLightbox.push(mediaCardLightbox);
          arrayActiveFocusLightbox.push(captionMedia);
          arrayActiveFocusLightbox.push(leftBtn);
          arrayActiveFocusLightbox.push(rightBtn);
        }

        // -------------------- Add style focus for lightbox elements //
        // ------------------------------------------------ ********* //

        rightButtons.forEach((rightButton) => {
          focusStyle(rightButton, "page-elements_focus");
        });
        leftButtons.forEach((leftButton) => {
          focusStyle(leftButton, "page-elements_focus");
        });
        focusStyle(buttonCloseLightbox, "page-elements_focus");
        arrayCardsLightbox.forEach((cardLightbox) => {
          focusStyle(cardLightbox, "page-elements_focus--light");
          focusStyle(
            cardLightbox.childNodes[1].childNodes[0].childNodes[0],
            "page-elements_focus"
          );
          focusStyle(
            cardLightbox.childNodes[1].childNodes[1],
            "page-elements_focus"
          );
        });

        // ---------- Function for accessibility active card lightbox //
        // ------------------------------------------------ ********* //

        function addTabindexLightbox(imgGallery, arrayElements) {
          // Tabindex -1 for main sections and header page
          removeTabindexPage(arrayTabindexPage);
          removeTabindexImgGallery();
          // Hide arias for header and main elements
          pageHeader.setAttribute("aria-hidden", "true");
          main.setAttribute("aria-hidden", "true");
          // Add tabindex for button close modale lightbox
          buttonCloseLightbox.setAttribute("tabindex", "6");

          // Add tabindex for elements in active card lightbox focused
          if (
            imgGallery.getAttribute("data-id") ==
            arrayElements.getAttribute("data-id")
          ) {
            // Construct array containing elements lightbox focused
            getArrayActiveLightbox(arrayElements);
            // Add tabindex for elements focused in active card lightbox
            let x = 0;
            while (x < arrayActiveFocusLightbox.length) {
              arrayActiveFocusLightbox[x].setAttribute("tabindex", x + 1);
              x++;
            }
            // Add class active for active lightbox card
            arrayElements.classList.add("lightbox_card--active");
            // Add ARIA's
            arrayElements.setAttribute("aria-hidden", "false");
            arrayElements.setAttribute("aria-label", "Vue agrandie");
            // Place focus on card active
            arrayElements.focus();
          }
          // For other lightbox cards (non active)
          else {
            let leftBtn = arrayElements.childNodes[0];
            let rightBtn = arrayElements.childNodes[2];
            let mediaCardLightbox =
              arrayElements.childNodes[1].childNodes[0].childNodes[0];
            let captionMedia = arrayElements.childNodes[1].childNodes[1];

            // Remove class active for cards non actives
            arrayElements.classList.remove("lightbox_card--active");
            arrayElements.setAttribute("aria-hidden", "true");
            // Change tabindex for elements in cards non active
            arrayElements.setAttribute("tabindex", "-1");
            mediaCardLightbox.setAttribute("tabindex", "-1");
            captionMedia.setAttribute("tabindex", "-1");
            leftBtn.setAttribute("tabindex", "-1");
            rightBtn.setAttribute("tabindex", "-1");
          }
        }

        // --------------------------------- Function for nav buttons //
        // ------------------------------------------------ ********* //

        // Disable left/right button for first/last lightbox card
        arrayLeftButtons[0].classList.add("disabled");
        arrayRightButtons[arrayRightButtons.length - 1].classList.add(
          "disabled"
        );

        function navPreviousNext(iValue, ArrBtn, iNext, arrow) {
          for (let i = iValue; i < arrayCardsLightbox.length; i++) {
            let currentCard = arrayCardsLightbox[i];
            let currentButton = ArrBtn[i];
            let nextCard = arrayCardsLightbox[i + iNext];
            let indexCurrentCard = arrayCardsLightbox.indexOf(
              arrayCardsLightbox[i]
            );
            let indexCurrentButton = ArrBtn.indexOf(ArrBtn[i]);
            // Change display active card on event nav button
            // eslint-disable-next-line no-inner-declarations
            function eventNavBtns() {
              if (indexCurrentCard === indexCurrentButton) {
                currentCard.classList.remove("lightbox_card--active");
                currentCard.setAttribute("aria-hidden", "true");
                nextCard.classList.add("lightbox_card--active");
                nextCard.setAttribute("aria-hidden", "false");
                // Reset and construct new array containing elements focused in active card
                removeTabindexPage(arrayActiveFocusLightbox);
                arrayActiveFocusLightbox.length = 0;
                getArrayActiveLightbox(nextCard);
                // Add tabindex for elements focused in new active card
                let x = 0;
                while (x < arrayActiveFocusLightbox.length) {
                  arrayActiveFocusLightbox[x].setAttribute("tabindex", x + 1);
                  x++;
                }
                nextCard.focus();
              }
            }
            // Events for navs buttons (mouse and key)
            currentButton.addEventListener("click", () => {
              eventNavBtns();
            });
            currentCard.addEventListener("keydown", (e) => {
              if (e.code === arrow && nextCard !== undefined) {
                eventNavBtns();
              }
            });
          }
        }

        // ---------------------------- Function open lightbox modale //
        // ------------------------------------------------ ********* //

        function openLightboxActiveMedia() {
          // Display modale lightbox
          lightboxModal.style.display = "block";
          pageHeader.style.display = "none";
          body.style.overflow = "hidden";
        }

        // -------------------------------------------- Open lightbox //
        // ------------------------------------------------ ********* //

        // Call active media card lightbox on events
        for (let i = 0; i < arrayCardsLightbox.length; i++) {
          let currentCardLightbox = arrayCardsLightbox[i];

          imagesGallery.forEach((imageGallery) => {
            imageGallery.addEventListener("click", () => {
              openLightboxActiveMedia();
              addTabindexLightbox(imageGallery, currentCardLightbox);
              // Nav with left button
              navPreviousNext(1, arrayLeftButtons, -1, "ArrowLeft");
              // Nav with right button
              navPreviousNext(0, arrayRightButtons, 1, "ArrowRight");
            });
            imageGallery.addEventListener("keydown", (e) => {
              if (e.code === "Enter") {
                openLightboxActiveMedia();
                addTabindexLightbox(imageGallery, currentCardLightbox);
                // Nav with left button
                navPreviousNext(1, arrayLeftButtons, -1, "ArrowLeft");
                // Nav with right button
                navPreviousNext(0, arrayRightButtons, 1, "ArrowRight");
              }
            });
          });
        }

        // --------------------------------- Close lightbox on events //
        // ------------------------------------------------ ********* //

        async function closeLightbox() {
          lightboxModalButton.addEventListener("click", () => {
            getTabindexPage();
            addTabindexImgGallery();
            select.focus();
            pageHeader.setAttribute("aria-hidden", "false");
            pageHeader.style.display = "flex";
            main.setAttribute("aria-hidden", "false");
            lightboxModal.style.display = "none";
            body.style.overflow = "auto";
            arrayActiveFocusLightbox.length = 0;
          });
        }
        closeLightbox();
      }

      generateLightbox();

      // ************************************************************************** //
      // ---------------------------- SORTING EVENTS ------------------------------ //
      // ************************************************************************** //
      function dateSorting(a, b) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      }
      async function sortingFilter() {
        sortingSelect.addEventListener("change", () => {
          if (optionPopularite.selected == true) {
            optionTitle.selected = false;
            optionDate.selected = false;
            lightboxCard.innerHTML = ""; // Clear lightbox container
            photographMedias = photographMedias.sort(
              (a, b) => a.likes - b.likes
            );
            addCssOrder(); // Change CSS order of flexbox containers
            addTabindexImgGallery(); // Change tabindex for images gallery
            generateLightbox(); // Generate new lightbox sorted
          }
          if (optionDate.selected == true) {
            optionPopularite.selected = false;
            optionTitle.selected = false;
            lightboxCard.innerHTML = ""; // Clear lightbox container
            photographMedias = photographMedias.sort(dateSorting);
            addCssOrder(); // Change CSS order of flexbox containers
            addTabindexImgGallery(); // Change tabindex for images gallery
            generateLightbox(); // Generate new lightbox sorted
          }
          if (optionTitle.selected == true) {
            optionPopularite.selected = false;
            optionDate.selected = false;
            lightboxCard.innerHTML = ""; // Clear lightbox container
            photographMedias = photographMedias.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
            addCssOrder(); // Change CSS order of flexbox containers
            addTabindexImgGallery(); // Change tabindex for images gallery
            generateLightbox(); // Generate new lightbox sorted
          }
        });
        return photographMedias;
      }
      sortingFilter();
    })

    //******************************************************************************* //
    // --------------------- MESSAGE DISPLAYED IF ERROR LOADING --------------------- //
    //******************************************************************************* //

    .catch((error) => {
      const main = document.querySelector("main");
      main.innerHTML +=
        "<p>Erreur de chargement des données</p><p>" + error.message + "</p>";
    });
}

getPhotographer();
