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
    namePhotographer.textContent = name;
    // Localisation photographer
    const pLocalisation = document.createElement("p");
    pLocalisation.classList.add("p_localisation");
    pLocalisation.textContent = city + ", " + country;
    // Slogan  photographer
    const pTagline = document.createElement("p");
    pTagline.classList.add("p_tagline");
    pTagline.textContent = tagline;
    //----------------------------------------- IMAGE
    const imgPhotographer = document.createElement("img");
    imgPhotographer.setAttribute("src", picture);
    imgPhotographer.setAttribute("alt", name);
    //------------------------------------------ TITLE FOR MODAL
    const titleModal = document.getElementById("modal-title");
    const modalContent = document.querySelector(".modal");
    titleModal.innerHTML = "Contactez-moi <br>" + name;
    titleModal.setAttribute("id", "title_form-contact");
    modalContent.setAttribute("aria-labelledby", "title_form-contact");
    modalContent.setAttribute("aria-label", "Contact me " + name);

    //
    // appendChild
    photographHeader.insertBefore(identityPhotographer, buttonContact);
    identityPhotographer.appendChild(namePhotographer);
    identityPhotographer.appendChild(pLocalisation);
    identityPhotographer.appendChild(pTagline);
    photographHeader.appendChild(imgPhotographer);
    return photographHeader;
  }
  return { name, picture, getUserProfileDOM };
}
