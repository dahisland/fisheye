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
    // container for price
    const pricePhotographer = document.createElement("p");
    pricePhotographer.setAttribute("aria-label", "price");
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
