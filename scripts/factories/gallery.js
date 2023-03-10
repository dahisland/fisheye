//********************************************************************************** //
// ------------------------ GALLERY FACTORY (for page index) ----------------------- //
//********************************************************************************** //

function galleryFactory(data) {
  // ------------------------------------------------ Variables //
  // ------------------------------------------------ ********* //

  const { photographerId, image, title, likes, id } = data; // Destructuring
  const mediaPhoto = `./assets/medias/${photographerId}/${image}`;

  function getGalleryCardDOM() {
    // ---------------------------------------- Create elements //
    // ---------------------------------------------- ********* //

    // Card photo container
    const figure = document.createElement("figure");
    figure.setAttribute("id", "card" + id);
    // Photo
    const photo = document.createElement("img");
    photo.setAttribute("src", mediaPhoto);
    photo.setAttribute("alt", title);
    photo.setAttribute("role", "link");
    photo.setAttribute("aria-label", title + ", Agrandir l'image");
    photo.setAttribute("data-id", id);
    photo.classList.add("images-gallery");
    // Figaption
    const figcaption = document.createElement("figcaption");
    // Container for media title
    const titlePhoto = document.createElement("p");
    titlePhoto.setAttribute("aria-label", title);
    titlePhoto.classList.add("title-photo");
    titlePhoto.textContent = title;
    // Container for likes
    const likePhoto = document.createElement("a");
    likePhoto.setAttribute("href", "#");
    likePhoto.setAttribute("id", "likes" + id);
    likePhoto.setAttribute("aria-label", "Aimer cette image");
    likePhoto.setAttribute("role", "checkbox");
    likePhoto.setAttribute("aria-checked", "false");
    likePhoto.innerHTML =
      '<span class="text-likes">' +
      likes +
      ' </span><span class="fas fa-heart"></span>';

    // ------------------------------------------- Append child //
    // ---------------------------------------------- ********* //

    figure.appendChild(photo);
    figure.appendChild(figcaption);
    figcaption.appendChild(titlePhoto);
    figcaption.appendChild(likePhoto);

    return figure;
  }
  return { getGalleryCardDOM };
}

export { galleryFactory };
