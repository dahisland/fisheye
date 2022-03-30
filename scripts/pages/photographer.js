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
          containerLike.addEventListener("click", () => {
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

      let arrayTabindexPage = [];
      arrayTabindexPage.push(logo);
      arrayTabindexPage.push(mainTitle);
      arrayTabindexPage.push(identityInfos);
      arrayTabindexPage.push(contactButton);
      arrayTabindexPage.push(photoProfile);
      arrayTabindexPage.push(aside);
      arrayTabindexPage.push(sortingLabel);
      arrayTabindexPage.push(select);

      async function getTabindexPage() {
        let n = 0;
        while (n < arrayTabindexPage.length) {
          arrayTabindexPage[n].setAttribute("tabindex", n + 1);
          arrayTabindexPage[n].classList.add("page-elements_focus");
          n++;
        }
      }

      async function addTabindexImgGallery() {
        photographMedias.forEach((photographMedia) => {
          const imgGallery = document.getElementById(
            "card" + photographMedia.id
          );
          imgGallery.childNodes[0].setAttribute(
            "tabindex",
            photographMedias.indexOf(photographMedia) + 9
          );
          imgGallery.childNodes[0].classList.add("page-elements_focus");
        });
      }

      async function removeTabindexImgGallery() {
        photographMedias.forEach((photographMedia) => {
          const imgGallery = document.getElementById(
            "card" + photographMedia.id
          );
          imgGallery.childNodes[0].setAttribute("tabindex", "-1");
          imgGallery.childNodes[0].classList.remove("page-elements_focus");
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
      addTabindexImgGallery();
      incrementLikes();
      getTotalLikes();
      getTabindexPage();

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
        lightboxModalButton.classList.add("page-elements_focus");
        const lightboxButtonImg = document.createElement("img");
        lightboxButtonImg.setAttribute("src", "./assets/icons/close_brown.svg");
        lightboxButtonImg.setAttribute("alt", "Fermer la lightbox");
        lightboxButtonImg.setAttribute("fill", "red");
        lightboxModalButton.appendChild(lightboxButtonImg);
        lightboxCard.appendChild(lightboxModalButton);

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

        // ------------- Active media lightbox events ------------ //
        // ------------------------------------------------------- //
        let arrayFocusLightbox = [];

        // Function to add/remove class active
        function openLightboxActiveMedia(imgGallery, arrayCard) {
          const pageHeader = document.querySelector(".page-header");
          const main = document.querySelector("main");
          const buttonCloseLightbox = document.querySelector(
            ".lightbox_card > button"
          );
          let leftBtn = arrayCard.childNodes[0];
          let rightBtn = arrayCard.childNodes[2];
          let mediaLightbox =
            arrayCard.childNodes[1].childNodes[0].childNodes[0];
          let captionMedia = arrayCard.childNodes[1].childNodes[1];

          pageHeader.setAttribute("aria-hidden", "true");
          main.setAttribute("aria-hidden", "true");
          lightboxModal.style.display = "block";
          body.style.overflow = "hidden";
          arrayTabindexPage.forEach((tabindexPage) => {
            tabindexPage.setAttribute("tabindex", "-1");
          });
          removeTabindexImgGallery();
          buttonCloseLightbox.setAttribute("tabindex", "6");
          buttonCloseLightbox.classList.add("page-elements_focus");
          if (
            imgGallery.getAttribute("data-id") ==
            arrayCard.getAttribute("data-id")
          ) {
            arrayFocusLightbox.push(arrayCard);
            arrayFocusLightbox.push(mediaLightbox);
            arrayFocusLightbox.push(captionMedia);
            arrayFocusLightbox.push(leftBtn);
            arrayFocusLightbox.push(rightBtn);

            let x = 0;
            while (x < arrayFocusLightbox.length) {
              arrayFocusLightbox[x].setAttribute("tabindex", x + 1);
              arrayFocusLightbox[x].classList.add("page-elements_focus");
              x++;
            }

            arrayCard.classList.add("lightbox_card--active");
            arrayCard.focus();
          } else {
            arrayCard.classList.remove("lightbox_card--active");
            arrayCard.setAttribute("tabindex", "-1");
            mediaLightbox.setAttribute("tabindex", "-1");
            captionMedia.setAttribute("tabindex", "-1");
            leftBtn.setAttribute("tabindex", "-1");
            rightBtn.setAttribute("tabindex", "-1");
          }
        }

        // Open active media card lightbox on event
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

        async function eventNavButtons(
          operatorCard,
          arrayButtons,
          indexDisabled
        ) {
          for (let i = 0; i < arrayCardsLightbox.length; i++) {
            let currentCard = arrayCardsLightbox[i];
            let nextCard = arrayCardsLightbox[i + operatorCard];
            let currentButton = arrayButtons[i];
            let indexCurrentCard = arrayCardsLightbox.indexOf(
              arrayCardsLightbox[i]
            );
            let indexCurrentButton = arrayButtons.indexOf(arrayButtons[i]);

            if (indexCurrentCard === indexCurrentButton) {
              currentButton.addEventListener("click", () => {
                currentCard.classList.remove("lightbox_card--active");
                nextCard.classList.add("lightbox_card--active");
              });
              currentButton.addEventListener("keydown", (e) => {
                if (e.code == "Enter" && nextCard !== undefined) {
                  let mediaLightbox =
                    nextCard.childNodes[1].childNodes[0].childNodes[0];
                  let captionMedia = nextCard.childNodes[1].childNodes[1];
                  let leftBtn = nextCard.childNodes[0];
                  let rightBtn = nextCard.childNodes[2];

                  currentCard.classList.remove("lightbox_card--active");
                  nextCard.classList.add("lightbox_card--active");

                  arrayFocusLightbox.forEach((focusLightbox) => {
                    focusLightbox.setAttribute("tabindex", "-1");
                    focusLightbox.classList.remove("page-elements_focus");
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
                    arrayFocusLightbox[x].classList.add("page-elements_focus");
                    x++;
                  }
                  nextCard.focus();
                } else if (e.code == "Enter" && nextCard === undefined) {
                  e.preventDefault();
                }
              });
            }
            if (indexCurrentCard === indexDisabled) {
              currentButton.classList.add("disabled");
            }
          }
        }
        // ----------- Nav left button
        eventNavButtons(-1, arrayLeftButtons, 0);
        // ----------- Nav right button
        eventNavButtons(+1, arrayRightButtons, arrayCardsLightbox.length - 1);

        // ------------------ Event close lightbox --------------- //
        // ------------------------------------------------------- //

        async function closeLightbox() {
          lightboxModalButton.addEventListener("click", () => {
            const pageHeader = document.querySelector(".page-header");
            const main = document.querySelector("main");
            const imgGallery = document.querySelectorAll(".images-gallery");
            getTabindexPage();
            addTabindexImgGallery();
            imgGallery[0].focus();
            pageHeader.setAttribute("aria-hidden", "false");
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
