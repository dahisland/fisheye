function lightboxFactory(data) {
  const { photographerId, image, video, title, id } = data;
  const imagePhotographer = `./assets/medias/${photographerId}/${image}`;
  const videoPhotographer = `./assets/medias/${photographerId}/${video}`;

  function getLightboxCardDOM() {
    const lightboxCard = document.createElement("div");
    lightboxCard.classList.add("lightbox_card");
    lightboxCard.setAttribute("data-id", id);

    const beforeButton = document.createElement("a");
    beforeButton.setAttribute("href", "#");
    beforeButton.innerHTML = '<span class="fas fa-angle-left"></span>';

    const figure = document.createElement("figure");

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = title;

    const nextButton = document.createElement("a");
    nextButton.setAttribute("href", "#");
    nextButton.innerHTML = '<span class="fas fa-angle-right"></span>';

    lightboxCard.appendChild(beforeButton);
    lightboxCard.appendChild(figure);
    lightboxCard.appendChild(nextButton);

    if (video !== undefined) {
      const containerVideo = document.createElement("video");
      containerVideo.setAttribute("src", videoPhotographer);
      containerVideo.setAttribute("controls", "");
      containerVideo.setAttribute("width", "100%");
      figure.appendChild(containerVideo);
      figure.appendChild(figcaption);
    } else {
      const containerPicture = document.createElement("picture");
      const pictureImg = document.createElement("img");
      pictureImg.setAttribute("src", imagePhotographer);
      containerPicture.appendChild(pictureImg);
      figure.appendChild(containerPicture);
      figure.appendChild(figcaption);
    }

    return lightboxCard;
  }
  return { title, image, video, id, getLightboxCardDOM };
}
