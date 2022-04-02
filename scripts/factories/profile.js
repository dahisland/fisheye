//********************************************************************************** //
// ------------------------ PROFILE FACTORY (for page index) ----------------------- //
//********************************************************************************** //

function profileFactory(data) {
  // ------------------------------------------------ Variables //
  // ------------------------------------------------ ********* //

  const { name, portrait, city, country, tagline } = data;
  const picture = `./assets/photographers/${portrait}`;
  const buttonContact = document.querySelector(".contact_button");
  const photographHeader = buttonContact.parentNode;

  function getUserProfileDOM() {
    // ---------------------------------------- Create elements //
    // ---------------------------------------------- ********* //

    // Profile container
    const identityPhotographer = document.createElement("div");
    identityPhotographer.classList.add("identity");
    // Name photographer
    const namePhotographer = document.createElement("h1");
    namePhotographer.setAttribute("aria-label", name);
    namePhotographer.textContent = name;
    // Localisation photographer
    const identityInfo = document.createElement("div");
    const pLocalisation = document.createElement("p");
    pLocalisation.classList.add("p_localisation");
    pLocalisation.textContent = city + ", " + country;
    // Slogan photographer
    const pTagline = document.createElement("p");
    pTagline.classList.add("p_tagline");
    pTagline.textContent = tagline;
    // Image photographer
    const imgPhotographer = document.createElement("img");
    imgPhotographer.setAttribute("src", picture);
    imgPhotographer.setAttribute("alt", name);

    // ------------------------------------------- Append child //
    // ---------------------------------------------- ********* //

    photographHeader.insertBefore(identityPhotographer, buttonContact);
    identityPhotographer.appendChild(namePhotographer);
    identityInfo.appendChild(pLocalisation);
    identityInfo.appendChild(pTagline);
    identityPhotographer.appendChild(identityInfo);
    photographHeader.appendChild(imgPhotographer);

    return photographHeader;
  }
  return { getUserProfileDOM };
}

export { profileFactory };
