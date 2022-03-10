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
      photographers.forEach((photographer) => {
        const idProfile = photographer.id;
        if (idProfile == idUrlParam) {
          const photographerModel = profileFactory(photographer);
          photographerModel.getUserProfileDOM();
        }
      });

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

      // Function for load gallery
      async function loadGallery() {
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
        // Default display sorting (popularity is selected by default)
        photographMedias = photographMedias.sort((a, b) => a.likes - b.likes);
        getGallery();
        // Function for likes/unlikes with default display
        getLikesUnlikes();
        // Sorting events
        sortingSelect.addEventListener("change", () => {
          if (optionPopularite.selected) {
            photographMedias = photographMedias.sort(
              (a, b) => a.likes - b.likes
            );
            galleryContainer.innerHTML = "";
            getGallery();
          }
          if (optionDate.selected) {
            function dateSorting(a, b) {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateA - dateB;
            }
            photographMedias = photographMedias.sort(dateSorting);
            galleryContainer.innerHTML = "";
            getGallery();
          }
          if (optionTitle.selected) {
            photographMedias = photographMedias.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
            galleryContainer.innerHTML = "";
            getGallery();
          }
          // Function for likes/unlikes with default display
          getLikesUnlikes();
        });
      }
      loadGallery();

      // -------------------------  FUNCTION FOR LIKES / UNLIKES

      async function getLikesUnlikes() {
        photographMedias.forEach((photographMedia) => {
          let statutLike = false;
          const containerLike = document.getElementById(photographMedia.id);
          containerLike.addEventListener("click", () => {
            let likesMedia = photographMedia.likes;
            let newlikesMedia = likesMedia + 1;
            let newUnlikesMedia = newlikesMedia - 1;
            containerLike.firstChild.classList.toggle("number-likes");
            const mediaObj = JSON.stringify(likesMedia);
            const mediaObjParsed = JSON.parse(mediaObj, (value) => {
              if (statutLike == false) {
                value = newlikesMedia;
                statutLike = true;
              } else {
                value = newUnlikesMedia;
                statutLike = false;
              }
              return value;
            });
            containerLike.firstChild.innerHTML = mediaObjParsed + " ";
          });
        });
      }
    })
    // -------------------------  MESSAGE DISPLAYED IF ERROR LOADING
    .catch(function (error) {
      main.innerHTML +=
        "<p>Erreur de chargement des données</p><p>" + error.message + "</p>";
    });
}

getPhotographer();
