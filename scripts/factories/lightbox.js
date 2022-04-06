//********************************************************************************** //
// ------------------------ LIGHTBOX FACTORY (for page index) ---------------------- //
//********************************************************************************** //

function lightboxFactory(data) {
  // ------------------------------------------------ Variables //
  // ------------------------------------------------ ********* //

  const { photographerId, image, video, title, id, tracks } = data; // Destructuring
  const imagePhotographer = `./assets/medias/${photographerId}/${image}`;
  const videoPhotographer = `./assets/medias/${photographerId}/${video}`;
  const trackFile = `./assets/tracks/${tracks}`;

  function getLightboxCardDOM() {
    // ---------------------------------------- Create elements //
    // ---------------------------------------------- ********* //

    // Card container
    const containerMedia = document.createElement("div");
    containerMedia.classList.add("lightbox_card--absolute");
    containerMedia.setAttribute("tabindex", "-1");
    containerMedia.setAttribute("data-id", id);
    // Previous button nav
    const beforeButton = document.createElement("a");
    beforeButton.setAttribute("tabindex", "-1");
    beforeButton.classList.add("left-button");
    beforeButton.setAttribute("href", "#");
    beforeButton.setAttribute("aria-label", "previous image");
    beforeButton.innerHTML = '<span class="fas fa-angle-left"></span>';
    // Next button nav
    const nextButton = document.createElement("a");
    nextButton.setAttribute("tabindex", "-1");
    nextButton.classList.add("right-button");
    nextButton.setAttribute("href", "#");
    nextButton.setAttribute("aria-label", "next image");
    nextButton.innerHTML = '<span class="fas fa-angle-right"></span>';
    // Container figure for media & caption
    const figure = document.createElement("figure");
    figure.classList.add("figure-media");
    // Figcaption
    const figcaption = document.createElement("figcaption");
    figcaption.setAttribute("tabindex", "-1");
    figcaption.setAttribute("aria-label", title);
    figcaption.innerHTML = title;
    // Media
    if (video !== undefined) {
      // Media video
      const divContainVideo = document.createElement("div");
      const containerVideo = document.createElement("video");
      containerVideo.setAttribute("src", videoPhotographer);
      containerVideo.setAttribute("tabindex", "-1");
      containerVideo.setAttribute("controls", "");
      containerVideo.setAttribute("width", "100%");
      containerVideo.classList.add("medias-lightbox");
      containerVideo.setAttribute("aria-label", "video " + title);
      // Container for subtitles
      const trackVideo = document.createElement("track");
      trackVideo.setAttribute("kind", "subtitles");
      trackVideo.setAttribute("src", trackFile);
      trackVideo.setAttribute("srclang", "en");
      trackVideo.setAttribute("label", "English");
      trackVideo.setAttribute("default", "true");
      containerVideo.appendChild(trackVideo);
      divContainVideo.appendChild(containerVideo);
      // Append child
      figure.appendChild(divContainVideo);
      figure.appendChild(figcaption);
    } else {
      // Media image
      const containerPicture = document.createElement("picture");
      const pictureImg = document.createElement("img");
      pictureImg.setAttribute("tabindex", "-1");
      pictureImg.classList.add("medias-lightbox");
      pictureImg.setAttribute("src", imagePhotographer);
      pictureImg.setAttribute("alt", title);
      containerPicture.appendChild(pictureImg);
      // Append child
      figure.appendChild(containerPicture);
      figure.appendChild(figcaption);
    }

    // ------------------------------------------- Append child //
    // ---------------------------------------------- ********* //

    containerMedia.appendChild(beforeButton);
    containerMedia.appendChild(figure);
    containerMedia.appendChild(nextButton);

    return containerMedia;
  }
  return { getLightboxCardDOM };
}

export { lightboxFactory };
