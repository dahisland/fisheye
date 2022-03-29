function profileFactory(data) {
  const { name, portrait, city, country, tagline } = data;

  const picture = `./assets/photographers/${portrait}`;

  function getUserProfileDOM() {
    const buttonContact = document.querySelector(".contact_button");
    const photographHeader = buttonContact.parentNode;
    //------------------------------- Profile container
    const identityPhotographer = document.createElement("div");
    identityPhotographer.classList.add("identity");
    // Name photographer
    const namePhotographer = document.createElement("h1");
    namePhotographer.setAttribute("tabindex", "2");
    namePhotographer.textContent = name;
    // Localisation photographer
    const identityInfo = document.createElement("div");
    identityInfo.setAttribute("tabindex", "3");
    const pLocalisation = document.createElement("p");
    pLocalisation.classList.add("p_localisation");
    pLocalisation.textContent = city + ", " + country;
    // Slogan  photographer
    const pTagline = document.createElement("p");
    pTagline.classList.add("p_tagline");
    pTagline.textContent = tagline;
    //----------------------------------------- IMAGE
    const imgPhotographer = document.createElement("img");
    imgPhotographer.setAttribute("tabindex", "5");
    imgPhotographer.setAttribute("src", picture);
    imgPhotographer.setAttribute("alt", name);

    // appendChild
    photographHeader.insertBefore(identityPhotographer, buttonContact);
    identityPhotographer.appendChild(namePhotographer);
    identityInfo.appendChild(pLocalisation);
    identityInfo.appendChild(pTagline);
    identityPhotographer.appendChild(identityInfo);
    photographHeader.appendChild(imgPhotographer);
    return photographHeader;
  }
  return { getUserProfileDOM };
  // return { name, picture, getUserProfileDOM };
}

export { profileFactory };
