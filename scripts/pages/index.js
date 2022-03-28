import * as card from "../factories/cards.js";

function getPhotographers() {
  // ----------------------------------------------------------------------------- //
  // ----------------------------------- FETCH ----------------------------------- //
  // ----------------------------------------------------------------------------- //

  fetch("data/photographers.json")
    .then(function (response) {
      response.json().then(function (json) {
        const photographers = json.photographers;
        const photographersSection = document.querySelector(
          ".photographer_section"
        );

        // ----------------------------------------------------------------------- //
        // ----------------------- DISPLAY PHOTOGRAPHERS ------------------------- //
        // ----------------------------------------------------------------------- //

        photographers.forEach((photographer) => {
          const photographerModel = card.cardsFactory(photographer);
          const userCardDOM = photographerModel.getUserCardDOM();
          photographersSection.appendChild(userCardDOM);
        });
      });
    })

    // --------------------------------------------------------------------------- //
    // ------------------- MESSAGE DISPLAYED IF ERROR LOADING -------------------- //
    // --------------------------------------------------------------------------- //

    .catch(function (error) {
      main.innerHTML +=
        "<p>Erreur de chargement des données</p><p>" + error.message + "</p>";
    });
}
getPhotographers();
