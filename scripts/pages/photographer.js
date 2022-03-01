//Mettre le code JavaScript lié à la page photographer.html

const urlParam = new URL(window.location.href);
const idUrlParam = urlParam.searchParams.get("id");
console.log(idUrlParam);
function getProfile() {
  // test de fetch
  fetch("data/photographers.json")
    .then(function (response) {
      response.json().then(function (json) {
        const photographers = json.photographers;
        photographers.forEach((photographer) => {
          const idProfile = photographer.id;
          console.log(idProfile);
          if (idProfile == idUrlParam) {
            const photographerModel = profileFactory(photographer);
            photographerModel.getUserProfileDOM();
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
