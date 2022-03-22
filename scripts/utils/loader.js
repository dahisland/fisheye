// Loader

const loader = document.querySelector(".loader");
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    loader.style.display = "none";
  } else {
    loader.style.display = "flex";
  }
};
