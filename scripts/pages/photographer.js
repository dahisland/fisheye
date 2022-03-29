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
            aside.setAttribute("tabindex", "6");
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
      // ------------ Function for attribute order ------------- //
      // ------------------------------------------------------- //

      // Add/change CSS attribute "order" and tabindex for each <figure> image gallery
      async function addCssOrderAndTabindex() {
        photographMedias.forEach((photographMedia) => {
          const card = document.getElementById("card" + photographMedia.id);
          card.style.order = photographMedias.indexOf(photographMedia);
          card.childNodes[0].setAttribute(
            "tabindex",
            photographMedias.indexOf(photographMedia) + 9
          );
        });
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

      // ----------------- Get section gallery ----------------- //
      // ------------------------------------------------------- //

      getImagesGallery();
      addCssOrderAndTabindex();
      incrementLikes();
      getTotalLikes();

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

        // --------------------- Active media -------------------- //
        // ------------------------------------------------------- //

        arrayCardsLightbox.forEach((arrayCardLightbox) => {
          const imagesGallery = document.querySelectorAll(".images-gallery");
          imagesGallery.forEach((imageGallery) => {
            imageGallery.addEventListener("click", () => {
              lightboxModal.style.display = "block";
              body.style.overflow = "hidden";
              if (
                imageGallery.getAttribute("data-id") ==
                arrayCardLightbox.getAttribute("data-id")
              ) {
                arrayCardLightbox.classList.add("lightbox_card--active");
              } else {
                arrayCardLightbox.classList.remove("lightbox_card--active");
              }
            });
          });
        });

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
            lightboxModal.style.display = "none";
            body.style.overflow = "auto";
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
            addCssOrderAndTabindex();
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
            addCssOrderAndTabindex();
            getLightbox(); // Display lightbox
          }
          if (optionTitle.selected == true) {
            optionPopularite.selected = false;
            optionDate.selected = false;
            lightboxCard.innerHTML = ""; // Clear lightbox container
            photographMedias = photographMedias.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
            addCssOrderAndTabindex();
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
