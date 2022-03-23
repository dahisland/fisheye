// Loader

const loader = document.querySelector(".loader");
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    loader.style.display = "none";
    body.style.overflow = "auto";
  } else {
    loader.style.display = "flex";
    body.style.overflow = "hidden";
  }
};
