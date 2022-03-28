function lightboxFactory(data) {
  const { photographerId, image, video, title, id, tracks } = data;
  const imagePhotographer = `./assets/medias/${photographerId}/${image}`;
  const videoPhotographer = `./assets/medias/${photographerId}/${video}`;
  const trackFile = `./assets/tracks/${tracks}`;

  function getLightboxCardDOM() {
    const containerMedia = document.createElement("div");
    containerMedia.classList.add("lightbox_card--absolute");
    containerMedia.setAttribute("data-id", id);

    // Creation buttons navigation
    const beforeButton = document.createElement("a");
    beforeButton.classList.add("left-button");
    beforeButton.setAttribute("href", "#");
    beforeButton.setAttribute("aria-label", "previous image");
    beforeButton.innerHTML = '<span class="fas fa-angle-left"></span>';

    const nextButton = document.createElement("a");
    nextButton.classList.add("right-button");
    nextButton.setAttribute("href", "#");
    nextButton.setAttribute("aria-label", "next image");
    nextButton.innerHTML = '<span class="fas fa-angle-right"></span>';

    // Creation figure for media & caption
    const figure = document.createElement("figure");
    figure.classList.add("figure-media");

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = title;

    if (video !== undefined) {
      const containerVideo = document.createElement("video");
      containerVideo.setAttribute("src", videoPhotographer);
      containerVideo.setAttribute("controls", "");
      containerVideo.setAttribute("width", "100%");
      containerVideo.setAttribute("aria-label", "video " + title);
      const trackVideo = document.createElement("track");
      trackVideo.setAttribute("kind", "subtitles");
      trackVideo.setAttribute("src", trackFile);
      trackVideo.setAttribute("srclang", "en");
      trackVideo.setAttribute("label", "Anglais");
      containerVideo.appendChild(trackVideo);
      figure.appendChild(containerVideo);
      figure.appendChild(figcaption);
    } else {
      const containerPicture = document.createElement("picture");
      const pictureImg = document.createElement("img");
      pictureImg.setAttribute("src", imagePhotographer);
      pictureImg.setAttribute("alt", title);
      containerPicture.appendChild(pictureImg);
      figure.appendChild(containerPicture);
      figure.appendChild(figcaption);
    }
    containerMedia.appendChild(beforeButton);
    containerMedia.appendChild(figure);
    containerMedia.appendChild(nextButton);

    return containerMedia;
  }
  return { getLightboxCardDOM };
  // return { title, image, video, id, getLightboxCardDOM };
}

export { lightboxFactory };
