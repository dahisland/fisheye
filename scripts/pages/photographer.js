import * as profile from "../factories/profile.js";
import * as gallery from "../factories/gallery.js";
import * as lightbox from "../factories/lightbox.js";

const urlParam = new URL(window.location.href);
const idUrlParam = urlParam.searchParams.get("id");
function getPhotographer() {
  // ----------------------------------------------------------------------------- //
  // ----------------------------------- FETCH ----------------------------------- //
  // ----------------------------------------------------------------------------- //

  fetch("data/photographers.json")
    .then((response) => response.json())
    .then((json) => {
      const photographers = json.photographers;
      let medias = json.medias.sort((a, b) => a.likes - b.likes);
      const galleryContainer = document.querySelector(".gallery-cards");

      // -------------------------------------------------------------------------- //
      // --------------------- DISPLAY PHOTOGRAPHER PROFILE ----------------------- //
      // -------------------------------------------------------------------------- //

      async function photographerProfile() {
        photographers.forEach((photographer) => {
          const idProfile = photographer.id;
          if (idProfile == idUrlParam) {
            const photographerModel = profile.profileFactory(photographer);
            photographerModel.getUserProfileDOM();
            formContactTitle(photographer);
          }
        });
      }
      photographerProfile();

      // -------------------------------------------------------------------------- //
      // ----------- DISPLAY PHOTOGRAPHER ASIDE (TOTAL LIKES & PRICE) ------------- //
      // -------------------------------------------------------------------------- //

      async function photographerAside() {
        photographers.forEach((photographer) => {
          const idProfile = photographer.id;
          if (idProfile == idUrlParam) {
            const main = document.querySelector("main");
            const aside = document.createElement("aside");
            aside.setAttribute("aria-label", "popularity and rate");
            const pricePhotographer = document.createElement("p");
            pricePhotographer.classList.add("price-photographer");
            pricePhotographer.innerHTML = photographer.price + "€/jour";
            const totalLikesPhotographer = document.createElement("p");
            totalLikesPhotographer.classList.add("total-likes-photographer");

            main.appendChild(aside);
            aside.appendChild(totalLikesPhotographer);
            aside.appendChild(pricePhotographer);
          }
        });
      }
      photographerAside();

      // -------------------------------------------------------------------------- //
      // ----------------- DISPLAY SECTION PHOTOGRAPHER GALLERY ------------------- //
      // -------------------------------------------------------------------------- //

      const totalLikesContainer = document.querySelector(
        ".total-likes-photographer"
      );
      // Variables for sorting <select>
      const sortingSelect = document.querySelector("#sorting-label");
      const optionPopularite = document.querySelector("#option-popularite");
      const optionDate = document.querySelector("#option-date");
      const optionTitle = document.querySelector("#option-title");
      // Array with photograph medias
      let photographMedias = [];

      // -- Function to create array with photographer medias -- //
      // ------------------------------------------------------- //

      // Sorting by default (popularity is selected by default)
      photographMedias = photographMedias.sort((a, b) => a.likes - b.likes);

      async function getArrayPhotographerGallery() {
        medias.forEach((media) => {
          const idPhotoMedias = media.photographerId;
          if (idUrlParam == idPhotoMedias) {
            photographMedias.push(media);
          }
        });
      }
      getArrayPhotographerGallery();

      // ----------- Function to get images gallery ------------ //
      // ------------------------------------------------------- //

      async function getImagesGallery() {
        photographMedias.forEach((photographMedia) => {
          const mediaModel = gallery.galleryFactory(photographMedia);
          const galleryCardsDOM = mediaModel.getGalleryCardDOM();
          galleryContainer.appendChild(galleryCardsDOM);
        });
      }

      // ---------- Function to calculate total likes ---------- //
      // ------------------------------------------------------- //

      async function getTotalLikes() {
        let sumLikes = 0;
        for (let i = 0; i < photographMedias.length; i++) {
          sumLikes += photographMedias[i].likes;
        }
        totalLikesContainer.innerHTML =
          sumLikes + ' <span class="fas fa-heart"></span>';
      }

      // ---------- Function for incrementation likes ---------- //
      // ------------------------------------------------------- //

      async function incrementLikes() {
        photographMedias.forEach((photographMedia) => {
          let statutLike = false;
          const containerLike = document.getElementById(
            "likes" + photographMedia.id
          );
          containerLike.addEventListener("click", (e) => {
            e.preventDefault();
            let likesMedia = photographMedia.likes;
            const mediaObj = JSON.stringify(likesMedia);
            const mediaObjParsed = JSON.parse(mediaObj, (value) => {
              if (statutLike == false) {
                value = likesMedia + 1;
                containerLike.firstChild.classList.add("number-likes");
                statutLike = true;
              } else {
                value = likesMedia - 1;
                containerLike.firstChild.classList.remove("number-likes");
                statutLike = false;
              }
              return value;
            });
            photographMedia.likes = mediaObjParsed;
            containerLike.firstChild.innerHTML = mediaObjParsed + " ";
            // Recalculate total likes with new value for medias liked
            getTotalLikes();
          });
        });
      }

      // ----- Function attribute order for images gallery ----- //
      // ------------------------------------------------------- //

      // Add/change CSS attribute "order" for each <figure> image gallery
      async function addCssOrder() {
        photographMedias.forEach((photographMedia) => {
          const card = document.getElementById("card" + photographMedia.id);
          card.style.order = photographMedias.indexOf(photographMedia);
        });
      }

      // ----------------- Get section gallery ----------------- //
      // ------------------------------------------------------- //

      getImagesGallery();
      addCssOrder();
      incrementLikes();
      getTotalLikes();

      // -------------------------------------------------------------------------- //
      // ------------- FOCUS ACCESSIBILITY : TABINDEX FOR MAIN PAGE --------------- //
      // -------------------------------------------------------------------------- //

      const logo = document.querySelector(".page-header > a");
      const mainTitle = document.querySelector("h1");
      const identityInfos = document.querySelector(".identity > div");
      const contactButton = document.querySelector(".contact_button");
      const photoProfile = document.querySelector(".photograph-header > img");
      const aside = document.querySelector("aside");
      const sortingLabel = document.querySelector(".gallery-sorting > label");
      const select = document.querySelector("#sorting-label");

      // - Array for elements focused in page photographer (except gallery) - //
      // -------------------------------------------------------------------- //

      let arrayTabindexPage = [];
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

      // ----- Tabindex for elements page photographer (except gallery) ----- //
      // -------------------------------------------------------------------- //

      async function getTabindexPage() {
        let n = 0;
        while (n < arrayTabindexPage.length) {
          arrayTabindexPage[n].setAttribute("tabindex", n + 1);
          n++;
        }
      }

      // ------------------ Tabindex for elements gallery ------------------ //
      // ------------------------------------------------------------------- //

      async function addTabindexImgGallery() {
        photographMedias.forEach((photographMedia) => {
          const imgGallery = document.getElementById(
            "card" + photographMedia.id
          );
          const captionImage = imgGallery.childNodes[1].childNodes[0];
          const likeImage = imgGallery.childNodes[1].childNodes[1];
          imgGallery.childNodes[0].setAttribute(
            "tabindex",
            photographMedias.indexOf(photographMedia) + 9
          );
          captionImage.setAttribute(
            "tabindex",
            photographMedias.indexOf(photographMedia) + 9
          );
          likeImage.setAttribute(
            "tabindex",
            photographMedias.indexOf(photographMedia) + 9
          );
        });
      }

      // --------------- Reset tabindex for elements gallery --------------- //
      // ------------------------------------------------------------------- //

      async function removeTabindexImgGallery() {
        photographMedias.forEach((photographMedia) => {
          const imgGallery = document.getElementById(
            "card" + photographMedia.id
          );
          imgGallery.childNodes[0].setAttribute("tabindex", "-1");
        });
      }
      // ------------------- Call functions for tabindex ------------------- //
      // ------------------------------------------------------------------- //

      getTabindexPage();
      addTabindexImgGallery();

      // ----------- Events tabindex for open/close Contact modal ---------- //
      // ------------------------------------------------------------------- //

      const closeContactModal = document.querySelector(".modal > header > img");
      contactButton.addEventListener("click", () => {
        arrayTabindexPage.forEach((tabindexPage) => {
          tabindexPage.setAttribute("tabindex", "-1");
        });
        removeTabindexImgGallery();
      });
      contactButton.addEventListener("keydown", (e) => {
        if (e.code == "Enter") {
          arrayTabindexPage.forEach((tabindexPage) => {
            tabindexPage.setAttribute("tabindex", "-1");
          });
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

      // -------------------------------------------------------------------------- //
      // --------------------------- DISPLAY LIGHTBOX ----------------------------- //
      // -------------------------------------------------------------------------- //

      const lightboxModal = document.querySelector(".lightbox_modal");
      const lightboxCard = document.querySelector(".lightbox_card");

      async function getLightbox() {
        // ----------------- Generate medias cards --------------- //
        // ------------------------------------------------------- //

        // ----------- Create button close
        const lightboxModalButton = document.createElement("button");
        lightboxModalButton.setAttribute("aria-label", "close dialog");
        lightboxModalButton.setAttribute("tabindex", "-1");
        const lightboxButtonImg = document.createElement("img");
        lightboxButtonImg.setAttribute("src", "./assets/icons/close_brown.svg");
        lightboxButtonImg.setAttribute("alt", "Fermer la lightbox");
        lightboxButtonImg.setAttribute("fill", "red");
        lightboxModalButton.appendChild(lightboxButtonImg);
        lightboxCard.appendChild(lightboxModalButton);
        const buttonCloseLightbox = document.querySelector(
          ".lightbox_card > button"
        );

        // ----------- Get medias cards
        photographMedias.forEach((photographMedia) => {
          const lightboxModele = lightbox.lightboxFactory(photographMedia);
          const lightboxCardsDOM = lightboxModele.getLightboxCardDOM();
          lightboxCard.appendChild(lightboxCardsDOM);
        });

        // ----------------------- Variables --------------------- //
        // ------------------------------------------------------- //

        const imagesLightbox = document.querySelectorAll(
          ".lightbox_card--absolute"
        );
        const rightButtons = document.querySelectorAll(".right-button");
        const leftButtons = document.querySelectorAll(".left-button");

        // ----------- Generate arrays with nodeslists
        // Array medias cards
        let arrayCardsLightbox = [];
        imagesLightbox.forEach((imageLightbox) => {
          arrayCardsLightbox.push(imageLightbox);
        });
        // Array right buttons
        let arrayRightButtons = [];
        rightButtons.forEach((rightButton) => {
          arrayRightButtons.push(rightButton);
        });
        // Array left buttons
        let arrayLeftButtons = [];
        leftButtons.forEach((leftButton) => {
          arrayLeftButtons.push(leftButton);
        });

        // ----------- Generate style css focus for elements on focus and focusout
        function focusStyle(elementFocused) {
          elementFocused.addEventListener("focus", () => {
            elementFocused.classList.add("page-elements_focus");
          });
          elementFocused.addEventListener("focusout", () => {
            elementFocused.classList.remove("page-elements_focus");
          });
        }

        function focusStyleLight(elementFocused) {
          elementFocused.addEventListener("focus", () => {
            elementFocused.classList.add("page-elements_focus--simple");
          });
          elementFocused.addEventListener("focusout", () => {
            elementFocused.classList.remove("page-elements_focus--simple");
          });
        }

        arrayTabindexPage.forEach((tabindexPage) => {
          focusStyle(tabindexPage);
        });
        const imgsGallery = document.querySelectorAll(
          ".gallery-cards > figure > img"
        );
        imgsGallery.forEach((imgGallery) => {
          focusStyle(imgGallery);
        });
        const captionsGallery = document.querySelectorAll(
          ".gallery-cards > figure > figcaption > p"
        );
        captionsGallery.forEach((imgGallery) => {
          focusStyle(imgGallery);
        });
        const likesGallery = document.querySelectorAll(
          ".gallery-cards > figure > figcaption > a"
        );
        likesGallery.forEach((imgGallery) => {
          focusStyle(imgGallery);
        });
        rightButtons.forEach((rightButton) => {
          focusStyle(rightButton);
        });
        leftButtons.forEach((leftButton) => {
          focusStyle(leftButton);
        });
        focusStyle(buttonCloseLightbox);
        arrayCardsLightbox.forEach((cardLightbox) => {
          focusStyleLight(cardLightbox);
          focusStyle(cardLightbox.childNodes[1].childNodes[0].childNodes[0]);
          focusStyle(cardLightbox.childNodes[1].childNodes[1]);
        });

        // ------------- Active media lightbox events ------------ //
        // ------------------------------------------------------- //
        let arrayFocusLightbox = [];

        // Function called for events opening lightbox
        function openLightboxActiveMedia(imgGallery, arrayCard) {
          const pageHeader = document.querySelector(".page-header");
          const main = document.querySelector("main");
          let leftBtn = arrayCard.childNodes[0];
          let rightBtn = arrayCard.childNodes[2];
          let mediaLightbox =
            arrayCard.childNodes[1].childNodes[0].childNodes[0];
          let captionMedia = arrayCard.childNodes[1].childNodes[1];

          // Display modale lightbox
          lightboxModal.style.display = "block";
          body.style.overflow = "hidden";

          // Accessibility modifications
          pageHeader.setAttribute("aria-hidden", "true");
          main.setAttribute("aria-hidden", "true");
          pageHeader.style.display = "none";
          arrayTabindexPage.forEach((tabindexPage) => {
            tabindexPage.setAttribute("tabindex", "-1");
          });
          // Change tabindex for images gallery
          removeTabindexImgGallery();
          // Add tabindex for button close modale lightbox
          buttonCloseLightbox.setAttribute("tabindex", "6");

          if (
            imgGallery.getAttribute("data-id") ==
            arrayCard.getAttribute("data-id")
          ) {
            // Construct array containing elements lightbox focused
            arrayFocusLightbox.push(arrayCard);
            arrayFocusLightbox.push(mediaLightbox);
            arrayFocusLightbox.push(captionMedia);
            arrayFocusLightbox.push(leftBtn);
            arrayFocusLightbox.push(rightBtn);

            // Add tabindex for elements focused in lightbox
            let x = 0;
            while (x < arrayFocusLightbox.length) {
              arrayFocusLightbox[x].setAttribute("tabindex", x + 1);
              x++;
            }
            // Add class active (change z-index)
            arrayCard.classList.add("lightbox_card--active");
            arrayCard.setAttribute("aria-hidden", "false");
            arrayCard.setAttribute("aria-label", "closeup view");
            // Place focus on card active
            arrayCard.focus();
          } else {
            // Remove class active for cards non actives
            arrayCard.classList.remove("lightbox_card--active");
            arrayCard.setAttribute("aria-hidden", "true");
            // Change tabindex for elements in cards non active
            arrayCard.setAttribute("tabindex", "-1");
            mediaLightbox.setAttribute("tabindex", "-1");
            captionMedia.setAttribute("tabindex", "-1");
            leftBtn.setAttribute("tabindex", "-1");
            rightBtn.setAttribute("tabindex", "-1");
          }
        }

        // Call active media card lightbox on events
        for (let i = 0; i < arrayCardsLightbox.length; i++) {
          let currentCardLightbox = arrayCardsLightbox[i];
          const imagesGallery = document.querySelectorAll(".images-gallery");

          imagesGallery.forEach((imageGallery) => {
            imageGallery.addEventListener("click", () => {
              openLightboxActiveMedia(imageGallery, currentCardLightbox);
            });
            imageGallery.addEventListener("keydown", (e) => {
              if (e.code === "Enter") {
                openLightboxActiveMedia(imageGallery, currentCardLightbox);
              }
            });
          });
        }

        // --------------- Function for nav buttons -------------- //
        // ------------------------------------------------------- //

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
            function eventNavBtns() {
              if (indexCurrentCard === indexCurrentButton) {
                currentCard.classList.remove("lightbox_card--active");
                nextCard.classList.add("lightbox_card--active");

                let mediaLightbox =
                  nextCard.childNodes[1].childNodes[0].childNodes[0];
                let captionMedia = nextCard.childNodes[1].childNodes[1];
                let leftBtn = nextCard.childNodes[0];
                let rightBtn = nextCard.childNodes[2];

                arrayFocusLightbox.forEach((focusLightbox) => {
                  focusLightbox.setAttribute("tabindex", "-1");
                });

                arrayFocusLightbox.length = 0;
                arrayFocusLightbox.push(nextCard);
                arrayFocusLightbox.push(mediaLightbox);
                arrayFocusLightbox.push(captionMedia);
                arrayFocusLightbox.push(leftBtn);
                arrayFocusLightbox.push(rightBtn);

                let x = 0;
                while (x < arrayFocusLightbox.length) {
                  arrayFocusLightbox[x].setAttribute("tabindex", x + 1);
                  x++;
                }
                nextCard.focus();
              }
            }
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

        // Nav with left button
        navPreviousNext(1, arrayLeftButtons, -1, "ArrowLeft");
        // Nav with right button
        navPreviousNext(0, arrayRightButtons, 1, "ArrowRight");

        // ------------------ Event close lightbox --------------- //
        // ------------------------------------------------------- //

        async function closeLightbox() {
          lightboxModalButton.addEventListener("click", () => {
            const pageHeader = document.querySelector(".page-header");
            const main = document.querySelector("main");
            getTabindexPage();
            addTabindexImgGallery();
            select.focus();
            pageHeader.setAttribute("aria-hidden", "false");
            pageHeader.style.display = "flex";
            main.setAttribute("aria-hidden", "false");
            lightboxModal.style.display = "none";
            body.style.overflow = "auto";
            arrayFocusLightbox.length = 0;
          });
        }
        closeLightbox();
      }

      getLightbox();

      // -------------------------------------------------------------------------- //
      // ---------------------------- SORTING EVENTS ------------------------------ //
      // -------------------------------------------------------------------------- //

      async function sortingFilter() {
        sortingSelect.addEventListener("change", () => {
          if (optionPopularite.selected == true) {
            optionTitle.selected = false;
            optionDate.selected = false;
            lightboxCard.innerHTML = ""; // Clear lightbox container
            photographMedias = photographMedias.sort(
              (a, b) => a.likes - b.likes
            );
            addCssOrder();
            addTabindexImgGallery();
            getLightbox(); // Display lightbox
          }
          if (optionDate.selected == true) {
            optionPopularite.selected = false;
            optionTitle.selected = false;
            lightboxCard.innerHTML = ""; // Clear lightbox container
            function dateSorting(a, b) {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateA - dateB;
            }
            photographMedias = photographMedias.sort(dateSorting);
            addCssOrder();
            addTabindexImgGallery();
            getLightbox(); // Display lightbox
          }
          if (optionTitle.selected == true) {
            optionPopularite.selected = false;
            optionDate.selected = false;
            lightboxCard.innerHTML = ""; // Clear lightbox container
            photographMedias = photographMedias.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
            addCssOrder();
            addTabindexImgGallery();
            getLightbox(); // Display lightbox
          }
        });
        return photographMedias;
      }
      sortingFilter();
    })

    // -------------------------------------------------------------------------- //
    // ------------------- MESSAGE DISPLAYED IF ERROR LOADING ------------------- //
    // -------------------------------------------------------------------------- //

    .catch(function (error) {
      main.innerHTML +=
        "<p>Erreur de chargement des données</p><p>" + error.message + "</p>";
    });
}

getPhotographer();
