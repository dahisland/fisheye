import * as card from "../factories/cards.js";

function getPhotographers() {
  //******************************************************************************* //
  // ------------------------------------ FETCH ----------------------------------- //
  //******************************************************************************* //

  fetch("data/photographers.json")
    .then(function (response) {
      response.json().then(function (json) {
        const photographers = json.photographers;
        const photographersSection = document.querySelector(
          ".photographer_section"
        );

        // ************************************************************************ //
        // ------------------------ DISPLAY PHOTOGRAPHERS ------------------------- //
        // ************************************************************************ //

        photographers.forEach((photographer) => {
          const photographerModel = card.cardsFactory(photographer);
          const userCardDOM = photographerModel.getUserCardDOM();
          photographersSection.appendChild(userCardDOM);
        });

        // ************************************************************************ //
        // ---------------------------- STYLE ON FOCUS ---------------------------- //
        // ************************************************************************ //

        const logo = document.querySelector("header > a");
        const mainTitle = document.querySelector("h1");
        const linksPhotographer = document.querySelectorAll(".a_photographer");
        const infosPhotographer = document.querySelectorAll("article > div");

        function styleFocus(elementFocused) {
          elementFocused.addEventListener("focus", () => {
            elementFocused.classList.add("page-elements_focus");
          });
          elementFocused.addEventListener("focusout", () => {
            elementFocused.classList.remove("page-elements_focus");
          });
        }

        styleFocus(logo);
        styleFocus(mainTitle);
        linksPhotographer.forEach((linkPhotographer) => {
          styleFocus(linkPhotographer);
        });
        infosPhotographer.forEach((infoPhotographer) => {
          styleFocus(infoPhotographer);
        });
      });
    })

    // **************************************************************************** //
    // -------------------- MESSAGE DISPLAYED IF ERROR LOADING -------------------- //
    // **************************************************************************** //

    .catch(function (error) {
      main.innerHTML +=
        "<p>Erreur de chargement des données</p><p>" + error.message + "</p>";
    });
}
getPhotographers();
