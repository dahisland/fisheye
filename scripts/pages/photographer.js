//Mettre le code JavaScript lié à la page photographer.html

const urlParam = new URL(window.location.href);
const idUrlParam = urlParam.searchParams.get("id");
function getPhotographer() {
  // --------------------------------------------------------------  FETCH
  fetch("data/photographers.json")
    .then((response) => response.json())
    .then((json) => {
      const photographers = json.photographers;
      let medias = json.medias.sort((a, b) => a.likes - b.likes);
      const galleryContainer = document.querySelector(".gallery-cards");

      // -------------------------  DISPLAY PHOTOGRAPHER PROFILE
      async function photographerProfile() {
        photographers.forEach((photographer) => {
          const idProfile = photographer.id;
          if (idProfile == idUrlParam) {
            const photographerModel = profileFactory(photographer);
            photographerModel.getUserProfileDOM();
            // -------------------------  DISPLAY PRICE ASIDE
            const aside = document.createElement("aside");
            const pricePhotographer = document.createElement("p");
            pricePhotographer.classList.add("price-photographer");
            pricePhotographer.innerHTML = photographer.price + "€/jour";
            const main = document.querySelector("main");
            main.appendChild(aside);
            aside.appendChild(pricePhotographer);
          }
        });
      }
      photographerProfile();

      // -------------------------  DISPLAY PHOTOGRAPHER GALLERY

      // New array containing only photographer's medias
      let photographMedias = [];
      // Function to construct new array
      async function filterGallery() {
        medias.forEach((media) => {
          const idPhotoMedias = media.photographerId;
          if (idUrlParam == idPhotoMedias) {
            photographMedias.push(media);
          }
        });
      }
      filterGallery();

      // -------------------------  DISPLAY TOTAL LIKES ASIDE
      const asideContainer = document.querySelector("aside");
      const priceContainer = document.querySelector(".price-photographer");
      const totalLikes = document.createElement("p");
      let sumLikes = 0;
      for (let i = 0; i < photographMedias.length; i++) {
        sumLikes += photographMedias[i].likes;
      }
      totalLikes.innerHTML = sumLikes + ' <span class="fas fa-heart"></span>';
      asideContainer.insertBefore(totalLikes, priceContainer);

      // Function for load gallery
      async function loadGallery() {
        // Variables
        const sortingSelect = document.querySelector("#sorting-label");
        const optionPopularite = document.querySelector("#option-popularite");
        const optionDate = document.querySelector("#option-date");
        const optionTitle = document.querySelector("#option-title");
        // Function for structure of gallery
        async function getGallery() {
          photographMedias.forEach((photographMedia) => {
            const mediaModel = galleryFactory(photographMedia);
            const galleryCardsDOM = mediaModel.getGalleryCardDOM();
            galleryContainer.appendChild(galleryCardsDOM);
          });
        }
        // Function for add style "order" for each flexbox card (<figure>)
        async function orderCards() {
          photographMedias.forEach((photographMedia) => {
            const card = document.getElementById("card" + photographMedia.id);
            card.style.order = photographMedias.indexOf(photographMedia);
          });
        }
        // Function for likes/unlikes with default display
        async function getLikesUnlikes() {
          photographMedias.forEach((photographMedia) => {
            let statutLike = false;
            const containerLike = document.getElementById(photographMedia.id);
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
              let sumLikes = 0;
              for (let i = 0; i < photographMedias.length; i++) {
                sumLikes += photographMedias[i].likes;
              }
              totalLikes.innerHTML =
                sumLikes + ' <span class="fas fa-heart"></span>';
              asideContainer.insertBefore(totalLikes, priceContainer);
            });
          });
        }
        // Default display sorting (popularity is selected by default)
        photographMedias = photographMedias.sort((a, b) => a.likes - b.likes);
        getGallery();
        orderCards();
        getLikesUnlikes();

        // Sorting events
        sortingSelect.addEventListener("change", () => {
          if (optionPopularite.selected) {
            photographMedias = photographMedias.sort(
              (a, b) => a.likes - b.likes
            );
            orderCards();
          }
          if (optionDate.selected) {
            function dateSorting(a, b) {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateA - dateB;
            }
            photographMedias = photographMedias.sort(dateSorting);
            orderCards();
          }
          if (optionTitle.selected) {
            photographMedias = photographMedias.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
            orderCards();
          }
        });
      }
      loadGallery();

      // Function for lightbox
      async function loadLightbox() {
        const lightboxModal = document.querySelector(".lightbox_modal");
        const lightboxCard = document.querySelector(".lightbox_card");
        const sortingSelect = document.querySelector("#sorting-label");
        const optionPopularite = document.querySelector("#option-popularite");
        const optionDate = document.querySelector("#option-date");
        const optionTitle = document.querySelector("#option-title");

        // Creation button to close lightbox modale
        const lightboxModalButton = document.createElement("button");
        const lightboxButtonImg = document.createElement("img");
        lightboxButtonImg.setAttribute("src", "./assets/icons/close_brown.svg");
        lightboxButtonImg.setAttribute("alt", "Fermer la lightbox");
        lightboxButtonImg.setAttribute("fill", "red");
        lightboxModalButton.appendChild(lightboxButtonImg);
        lightboxCard.appendChild(lightboxModalButton);

        // Creation cards lightbox
        function getLightboxCards() {
          photographMedias.forEach((photographMedia) => {
            const lightboxModele = lightboxFactory(photographMedia);
            const lightboxCardsDOM = lightboxModele.getLightboxCardDOM();
            lightboxCard.appendChild(lightboxCardsDOM);
          });
        }
        getLightboxCards();

        // Launch Gallery lightbox
        const imagesGallery = document.querySelectorAll(".images-gallery");
        const imagesLightbox = document.querySelectorAll(
          ".lightbox_card--absolute"
        );
        const leftButtons = document.querySelectorAll(".left-button");
        const rightButtons = document.querySelectorAll(".right-button");

        // Transform nodeslists in arrays
        let arrayCardsLightbox = [];
        imagesLightbox.forEach((imageLightbox) => {
          arrayCardsLightbox.push(imageLightbox);
        });

        let arrayRightButtons = [];
        rightButtons.forEach((rightButton) => {
          arrayRightButtons.push(rightButton);
        });

        let arrayLeftButtons = [];
        leftButtons.forEach((leftButton) => {
          arrayLeftButtons.push(leftButton);
        });

        // Add class active for active media on click on gallery image
        arrayCardsLightbox.forEach((arrayCardLightbox) => {
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

        // Function for left & right buttons
        function eventNavButtons(operatorCard, arrayButtons, indexDisabled) {
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

        // Call function for nav left button
        eventNavButtons(-1, arrayLeftButtons, 0);
        // Call function for nav right button
        eventNavButtons(+1, arrayRightButtons, arrayCardsLightbox.length - 1);

        // Close Gallery lightbox
        lightboxModalButton.addEventListener("click", () => {
          lightboxModal.style.display = "none";
          body.style.overflow = "auto";
        });
      }
      loadLightbox();
    })
    // -------------------------  MESSAGE DISPLAYED IF ERROR LOADING
    .catch(function (error) {
      main.innerHTML +=
        "<p>Erreur de chargement des données</p><p>" + error.message + "</p>";
    });
}

getPhotographer();
