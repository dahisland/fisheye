//********************************************************************************** //
// ---------------------- ASIDE FACTORY (for page photographer) -------------------- //
//********************************************************************************** //

function asideFactory(data) {
  // ------------------------------------------------ Variables //
  // ------------------------------------------------ ********* //
  const { price } = data; // Destructuring

  function getAsideDOM() {
    // ---------------------------------------- Create elements //
    // ---------------------------------------------- ********* //

    const aside = document.createElement("aside");
    aside.setAttribute("aria-label", "popularity and rate");
    // container for price
    const pricePhotographer = document.createElement("p");
    pricePhotographer.classList.add("price-photographer");
    pricePhotographer.innerHTML = price + "€/jour";
    // Container for total likes
    const totalLikesPhotographer = document.createElement("p");
    totalLikesPhotographer.classList.add("total-likes");

    // ------------------------------------------- Append child //
    // ---------------------------------------------- ********* //

    aside.appendChild(totalLikesPhotographer);
    aside.appendChild(pricePhotographer);
    return aside;
  }
  return { getAsideDOM };
}

export { asideFactory };
