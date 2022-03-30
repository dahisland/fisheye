function cardsFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // Card container
    const article = document.createElement("article");
    // Container link
    const linkPhotographer = document.createElement("a");
    linkPhotographer.setAttribute("href", "./photographer.html?id=" + id);
    linkPhotographer.setAttribute("aria-label", name);
    linkPhotographer.classList.add("a_photographer");
    // Image photographer
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    // Name photographer
    const h2 = document.createElement("h2");
    h2.textContent = name;
    // Container for text photographer
    const div = document.createElement("div");
    div.setAttribute("tabindex", "0");
    div.setAttribute("aria-label", "Informations photographer");
    // Localisation photographer
    const pLocalisation = document.createElement("p");
    pLocalisation.classList.add("p_localisation");
    pLocalisation.textContent = city + ", " + country;
    // Slogan  photographer
    const pTagline = document.createElement("p");
    pTagline.classList.add("p_tagline");
    pTagline.textContent = tagline;
    // Slogan  photographer
    const pPrice = document.createElement("p");
    pPrice.classList.add("p_price");
    pPrice.textContent = price + "€/jour";
    // appendChild
    article.appendChild(linkPhotographer);
    linkPhotographer.appendChild(img);
    linkPhotographer.appendChild(h2);
    article.appendChild(div);
    div.appendChild(pLocalisation);
    div.appendChild(pTagline);
    div.appendChild(pPrice);
    return article;
  }
  return { getUserCardDOM };
  // return { name, picture, getUserCardDOM };
}

export { cardsFactory };
