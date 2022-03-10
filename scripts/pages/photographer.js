//Mettre le code JavaScript lié à la page photographer.html

const urlParam = new URL(window.location.href);
const idUrlParam = urlParam.searchParams.get("id");
function getPhotographer() {
  // fetch
  fetch("data/photographers.json")
    .then((response) => response.json())
    .then((json) => {
      const photographers = json.photographers;
      let medias = json.medias.sort((a, b) => a.likes - b.likes);
      const galleryContainer = document.querySelector(".gallery-cards");

      // Display photographer profile
      photographers.forEach((photographer) => {
        const idProfile = photographer.id;
        if (idProfile == idUrlParam) {
          const photographerModel = profileFactory(photographer);
          photographerModel.getUserProfileDOM();
        }
      });

      // Display photographer gallery
      let photographMedias = [];
      function loadGallery() {
        medias.forEach((media) => {
          const idPhotoMedias = media.photographerId;
          if (idUrlParam == idPhotoMedias) {
            photographMedias.push(media);
            const mediaModel = galleryFactory(media);
            const galleryCardsDOM = mediaModel.getGalleryCardDOM();
            galleryContainer.appendChild(galleryCardsDOM);
          }
        });
      }
      loadGallery();

      // Sorting display for gallery
      function loadSortedGallery(objects) {
        objects.forEach((object) => {
          const photographerMediaModel = galleryFactory(object);
          const photographerGalleryCardsDOM =
            photographerMediaModel.getGalleryCardDOM();
          galleryContainer.appendChild(photographerGalleryCardsDOM);
        });
      }
      const sortingSelect = document.querySelector("#sorting-label");
      const optionPopularite = document.querySelector("#option-popularite");
      const optionDate = document.querySelector("#option-date");
      const optionTitle = document.querySelector("#option-title");
      sortingSelect.addEventListener("change", () => {
        if (optionPopularite.selected) {
          galleryContainer.innerHTML = "";
          loadSortedGallery(photographMedias.sort((a, b) => a.likes - b.likes));
        }
        if (optionDate.selected) {
          function dateSorting(a, b) {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
          }
          galleryContainer.innerHTML = "";
          loadSortedGallery(photographMedias.sort(dateSorting));
        }
        if (optionTitle.selected) {
          galleryContainer.innerHTML = "";
          loadSortedGallery(
            photographMedias.sort((a, b) => a.title.localeCompare(b.title))
          );
        }
      });

      // Incrementation likes
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
          console.log(mediaObjParsed);
          containerLike.firstChild.innerHTML = mediaObjParsed + " ";
        });
      });
    })
    // Message displayed if loading error
    .catch(function (error) {
      main.innerHTML +=
        "<p>Erreur de chargement des données</p><p>" + error.message + "</p>";
    });
}

getPhotographer();
