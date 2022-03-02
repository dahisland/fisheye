//Mettre le code JavaScript lié à la page photographer.html

const urlParam = new URL(window.location.href);
const idUrlParam = urlParam.searchParams.get("id");
function getProfile() {
  // test de fetch
  fetch("data/photographers.json")
    .then(function (response) {
      response.json().then(function (json) {
        const photographers = json.photographers;
        const medias = json.medias;
        const galleryContainer = document.querySelector(".gallery-cards");
        photographers.forEach((photographer) => {
          const idProfile = photographer.id;
          if (idProfile == idUrlParam) {
            const photographerModel = profileFactory(photographer);
            photographerModel.getUserProfileDOM();
          }
        });
        medias.forEach((media) => {
          const idPhotoMedias = media.photographerId;
          if (idUrlParam == idPhotoMedias) {
            const mediaModel = galleryFactory(media);
            const galleryCardsDOM = mediaModel.getGalleryCardDOM();
            galleryContainer.appendChild(galleryCardsDOM);
          }
        });
      });
    })
    .catch(function (error) {
      main.innerHTML +=
        "<p>Erreur de chargement des données</p><p>" + error.message + "</p>";
    });
}

getProfile();
