function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // Card container
    const article = document.createElement("article");
    // Container link
    const link = document.createElement("a");
    link.setAttribute("href", "./photographer.html");
    link.setAttribute("alt", "Aller vers la page de " + name);
    // Image photographer
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    // Name photographer
    const h2 = document.createElement("h2");
    h2.textContent = name;
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
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(pLocalisation);
    article.appendChild(pTagline);
    article.appendChild(pPrice);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
