function galleryFactory(data) {
  const { photographerId, image, title, likes, id } = data;

  const mediaPhoto = `./assets/medias/${photographerId}/${image}`;

  function getGalleryCardDOM() {
    // Card photo container
    const figure = document.createElement("figure");
    figure.setAttribute("id", "card" + id);

    // Photo
    const photo = document.createElement("img");
    photo.setAttribute("src", mediaPhoto);
    photo.setAttribute("alt", "Photo de " + title);
    photo.setAttribute("data-id", id);
    photo.classList.add("images-gallery");
    // figaption
    const figcaption = document.createElement("figcaption");
    // Container for media title
    const titlePhoto = document.createElement("p");
    titlePhoto.classList.add("title-photo");
    titlePhoto.textContent = title;
    // Container for likes
    const likePhoto = document.createElement("p");
    likePhoto.setAttribute("id", "likes" + id);
    likePhoto.innerHTML =
      '<span class="text-likes">' +
      likes +
      ' </span><span class="fas fa-heart"></span>';
    // appendChild
    figure.appendChild(photo);
    figure.appendChild(figcaption);
    figcaption.appendChild(titlePhoto);
    figcaption.appendChild(likePhoto);

    return figure;
  }
  return { title, image, likes, id, getGalleryCardDOM };
}
