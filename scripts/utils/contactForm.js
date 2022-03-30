const modal = document.getElementById("contact_modal");
const modalContent = document.querySelector(".modal");
const btnSubmit = document.querySelector("#submit-button");
const contactForm = document.querySelector("#contact-form");
const contactButton = document.querySelector(".contact_button");
const closeContactModal = document.querySelector(".modal > header > img");
const titleContactModal = document.querySelector(".modal > header > h2");
const inputsContainer = document.querySelector("#form-inputs");
const inputFirstname = document.querySelector("#firstname");
const inputLastname = document.querySelector("#lastname");
const inputEmail = document.querySelector("#email");
const textarea = document.querySelector("#message");
const inputs = document.querySelectorAll(".form-input");
const body = document.querySelector("body");

// Regex
const regexText =
  /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,\'\.\s-]{2,50}$/g;
const regexEmail =
  /^([\w/\_\\!#$%&£'\]\[*+=?^`{|}~"()\.,:;<>@-]{1,}[\@][a-zA-Z]{1,}[\.][a-zA-Z]{2,})$/;

//------------------------------------------ TITLE FOR MODAL
function formContactTitle(data) {
  const { name } = data;
  const titleModal = document.getElementById("modal-title");
  const modalContent = document.querySelector(".modal");
  titleModal.innerHTML = "Contactez-moi <br>" + name;
  titleModal.setAttribute("id", "title_form-contact");
  modalContent.setAttribute("aria-labelledby", "title_form-contact");
  modalContent.setAttribute("aria-label", "Contact me " + name);
}

// Create element paragraph for message when submit succeed
const pSubmit = document.createElement("p");
pSubmit.setAttribute("id", "message-submit");
pSubmit.setAttribute("aria-label", "send succeed");
pSubmit.innerHTML =
  "Votre message a bien été envoyé !<br>Nous vous recontacterons dès que possible.";
modalContent.appendChild(pSubmit);
const messageSubmit = document.querySelector("#message-submit");

// Create containers for error messages
inputs.forEach((input) => {
  const containerErrMessage = document.createElement("div");
  containerErrMessage.classList.add("error-data");
  inputsContainer.insertBefore(containerErrMessage, input);
  containerErrMessage.style.display = "none";
});

// Variables for each message error
const errorDatas = document.querySelectorAll(".error-data");
const errorFirstname = errorDatas[0];
const errorLastname = errorDatas[1];
const errorEmail = errorDatas[2];
const errorTextarea = errorDatas[3];

// Functions to open/close modal
function displayModal() {
  modal.style.display = "block";
  contactForm.style.display = "block";
  messageSubmit.style.display = "none";
  body.style.overflow = "hidden";
  contactForm.reset();
  errorDatas.forEach((error) => {
    error.style.display = "none";
  });
  inputs.forEach((input) => {
    input.style.outline = "none";
  });
  textarea.style.outline = "none";
  modalContent.focus();
}
function closeModal() {
  contactButton.focus();
  modal.style.display = "none";
  body.style.overflow = "auto";
}

closeContactModal.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code == "Enter") {
    closeModal();
  }
});

// Function for validation form inputs
function validateInputs(inputReference, label, errorReference, regex) {
  errorReference.style.display = "block";
  if (
    inputReference.value.length < 2 ||
    inputReference.value.length > 30 ||
    !inputReference.value.match(regex)
  ) {
    errorReference.style.color = "#901c1c";
    errorReference.innerHTML =
      "* Veuillez indiquer un " + label + " valide (requis)";
    inputReference.style.outline = "2px solid red";
    return false;
  } else {
    errorReference.style.color = "green";
    errorReference.innerHTML = '<span class="fa fa-check"></span>';
    inputReference.style.outline = "none";
    return true;
  }
}
// Function for validation textarea
function validateTextarea() {
  errorTextarea.style.display = "block";
  if (textarea.value.length < 10 || textarea.value.length > 400) {
    errorTextarea.style.color = "#901c1c";
    errorTextarea.innerHTML =
      "* Veuillez laisser un message (min 10 caractères, max 400)";
    textarea.style.outline = "2px solid red";
    return false;
  } else {
    errorTextarea.style.color = "green";
    errorTextarea.innerHTML = '<span class="fa fa-check"></span>';
    textarea.style.outline = "none";
    return true;
  }
}

// Validation form on submit
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs(inputFirstname, "prénom", errorFirstname, regexText);
  validateInputs(inputLastname, "nom", errorLastname, regexText);
  validateInputs(inputEmail, "email", errorEmail, regexEmail);
  validateTextarea();
  if (
    !validateInputs(inputFirstname, "prénom", errorFirstname, regexText) ||
    !validateInputs(inputLastname, "nom", errorLastname, regexText) ||
    !validateInputs(inputEmail, "email", errorEmail, regexEmail) ||
    !validateTextarea()
  ) {
    return false;
  } else {
    contactForm.style.display = "none";
    messageSubmit.style.display = "block";
    console.log("Prénom : " + inputFirstname.value);
    console.log("Nom : " + inputLastname.value);
    console.log("Email : " + inputEmail.value);
    console.log("Message : " + textarea.value);
    return true;
  }
});
