function profileFactory(data) {
  const { name, portrait, city, country, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserProfileDOM() {
    const buttonContact = document.querySelector(".contact_button");
    const photographHeader = buttonContact.parentNode;
    //------------------------------- Profile container
    const article = document.createElement("article");
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
    //----------------------------------------- IMAGE
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "Photo de " + name);
    //
    // appendChild
    photographHeader.insertBefore(article, buttonContact);
    article.appendChild(h2);
    article.appendChild(pLocalisation);
    article.appendChild(pTagline);
    photographHeader.appendChild(img);
    return photographHeader;
  }
  return { name, picture, getUserProfileDOM };
}
