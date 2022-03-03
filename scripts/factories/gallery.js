function galleryFactory(data) {
  const { photographerId, image, title, likes } = data;

  const mediaPhoto = `./assets/images/${photographerId}/${image}`;

  function getGalleryCardDOM() {
    // Card photo container
    const figure = document.createElement("figure");
    // Photo
    const photo = document.createElement("img");
    photo.setAttribute("src", mediaPhoto);
    photo.setAttribute("alt", "Photo de " + title);
    // figaption
    const figcaption = document.createElement("figcaption");
    // Container for media title
    const titlePhoto = document.createElement("p");
    titlePhoto.textContent = title;
    // Container for likes
    const likePhoto = document.createElement("p");
    likePhoto.innerHTML =
      likes + ' <span class="fas fa-heart" aria-label="likes"></span>';
    // appendChild
    figure.appendChild(photo);
    figure.appendChild(figcaption);
    figcaption.appendChild(titlePhoto);
    figcaption.appendChild(likePhoto);
    return figure;
  }
  return { title, image, getGalleryCardDOM };
}
