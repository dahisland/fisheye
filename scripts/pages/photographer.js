//Mettre le code JavaScript lié à la page photographer.html

const urlParam = new URL(window.location.href);
const idUrlParam = urlParam.searchParams.get("id");
function getProfile() {
  // test de fetch
  fetch("data/photographers.json")
    .then(function (response) {
      response.json().then(function (json) {
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
        function loadGallery() {
          medias.forEach((media) => {
            const idPhotoMedias = media.photographerId;
            if (idUrlParam == idPhotoMedias) {
              const mediaModel = galleryFactory(media);
              const galleryCardsDOM = mediaModel.getGalleryCardDOM();
              galleryContainer.appendChild(galleryCardsDOM);
            }
          });
        }
        loadGallery();
        // Sorting display for gallery
        const sortingSelect = document.querySelector("#sorting-label");
        const optionPopularite = document.querySelector("#option-popularite");
        const optionDate = document.querySelector("#option-date");
        const optionTitle = document.querySelector("#option-title");
        sortingSelect.addEventListener("change", () => {
          if (optionPopularite.selected) {
            let medias = json.medias.sort((a, b) => a.likes - b.likes);
            galleryContainer.innerHTML = "";
            loadGallery();
          }
          if (optionDate.selected) {
            function dateSorting(a, b) {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateA - dateB;
            }
            let medias = json.medias.sort(dateSorting);
            galleryContainer.innerHTML = "";
            loadGallery();
          }
          if (optionTitle.selected) {
            let medias = json.medias.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
            galleryContainer.innerHTML = "";
            loadGallery();
          }
        });
        // Incrementation likes
        function likes() {
          const containerLike = document.querySelectorAll(".number-likes");
          let statutLike = false;
        }
        likes();
      });
    })
    // Message displayed if loading error
    .catch(function (error) {
      main.innerHTML +=
        "<p>Erreur de chargement des données</p><p>" + error.message + "</p>";
    });
}

getProfile();
