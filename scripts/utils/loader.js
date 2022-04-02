//********************************************************************************** //
// -------------------------------------- LOADER ----------------------------------- //
//********************************************************************************** //

const loader = document.querySelector(".loader");
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    loader.style.display = "flex";
  } else {
    loader.style.display = "none";
  }
};
