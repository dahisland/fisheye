//********************************************************************************** //
// ------------------------------------ VARIABLES ---------------------------------- //
//********************************************************************************** //

const modal = document.getElementById("contact_modal");
const modalContent = document.querySelector(".modal");
const contactForm = document.querySelector("#contact-form");
const contactButton = document.querySelector(".contact_button");
const closeContactModal = document.querySelector(".modal > header > img");
const inputsContainer = document.querySelector("#form-inputs");
const inputFirstname = document.querySelector("#firstname");
const inputLastname = document.querySelector("#lastname");
const inputEmail = document.querySelector("#email");
const textarea = document.querySelector("#message");
const inputs = document.querySelectorAll(".form-input");
const body = document.querySelector("body");
const pageHeader = document.querySelector(".page-header");
const main = document.querySelector("main");

// ---------------------------------------------------- Regex //
// ------------------------------------------------ ********* //

const regexText =
  /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,.'\s-]{2,50}$/g;
const regexEmail =
  // eslint-disable-next-line no-useless-escape
  /^([\w/\_\\!#$%&£'\]\[*+=?^`{|}~"()\.,:;<>@-]{1,}[\@][a-zA-Z]{1,}[\.][a-zA-Z]{2,})$/;

//********************************************************************************** //
// -------------------------- DISPLAY PERSONNALISED TITLE -------------------------- //
//********************************************************************************** //

// eslint-disable-next-line no-unused-vars
function formContactTitle(data) {
  const { name } = data;
  const titleModal = document.getElementById("modal-title");
  const modalContent = document.querySelector(".modal");
  titleModal.innerHTML = "Contactez-moi <br>" + name;
  titleModal.setAttribute("id", "title_form-contact");
  modalContent.setAttribute("aria-labelledby", "title_form-contact");
  modalContent.setAttribute("aria-label", "Contact me " + name);
}

//********************************************************************************** //
// ------------------------- CREATE MESSAGE SUCCEED SUBMIT ------------------------- //
//********************************************************************************** //

const pSubmit = document.createElement("p");
pSubmit.setAttribute("id", "message-submit");
pSubmit.setAttribute("aria-label", "Message bien envoyé");
pSubmit.setAttribute("tabindex", "3");
pSubmit.innerHTML =
  "Votre message a bien été envoyé !<br>Nous vous recontacterons dès que possible.";
modalContent.appendChild(pSubmit);
const messageSubmit = document.querySelector("#message-submit");

//********************************************************************************** //
// ----------------------- CREATE CONTAINER FOR ERROR MESSAGES --------------------- //
//********************************************************************************** //

inputs.forEach((input) => {
  const containerErrMessage = document.createElement("div");
  containerErrMessage.classList.add("error-data");
  inputsContainer.insertBefore(containerErrMessage, input);
  containerErrMessage.style.display = "none";
});

// ------------------------  Variables for each message error //
// ------------------------------------------------ ********* //

const errorDatas = document.querySelectorAll(".error-data");
const errorFirstname = errorDatas[0];
const errorLastname = errorDatas[1];
const errorEmail = errorDatas[2];
const errorTextarea = errorDatas[3];

//********************************************************************************** //
// --------------------------- FUNCTIONS OPEN/CLOSE MODALE ------------------------- //
//********************************************************************************** //

// ---------------------------------------------- Open modale //
// ------------------------------------------------ ********* //

// eslint-disable-next-line no-unused-vars
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
  pageHeader.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
  pageHeader.style.display = "none";
}
function closeModal() {
  contactButton.focus();
  modal.style.display = "none";
  body.style.overflow = "auto";
  pageHeader.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
  pageHeader.style.display = "flex";
}

// --------------------------------------------- Close modale //
// ------------------------------------------------ ********* //

closeContactModal.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code == "Tab") {
    modalContent.focus();
  }
  if (e.code == "Enter") {
    closeModal();
  }
});

//********************************************************************************** //
// -------------------------- FUNCTIONS FOR VALIDATION FORM ------------------------ //
//********************************************************************************** //

// ---------------------------------------- Validation inputs //
// ------------------------------------------------ ********* //

function validateInputs(inputReference, label, errorReference, regex) {
  errorReference.style.display = "block";
  if (
    inputReference.value.length < 2 ||
    inputReference.value.length > 30 ||
    !inputReference.value.match(regex)
  ) {
    errorReference.style.color = "#901c1c";
    inputReference.setAttribute("aria-invalid", "true");
    errorReference.innerHTML =
      "* Veuillez indiquer un " + label + " valide (requis)";
    inputReference.style.outline = "2px solid red";
    return false;
  } else {
    errorReference.style.color = "green";
    inputReference.setAttribute("aria-invalid", "false");
    errorReference.innerHTML = '<span class="fa fa-check"></span>';
    inputReference.style.outline = "none";
    return true;
  }
}
// -------------------------------------- Validation textarea //
// ------------------------------------------------ ********* //

function validateTextarea() {
  errorTextarea.style.display = "block";
  if (textarea.value.length < 10 || textarea.value.length > 400) {
    errorTextarea.style.color = "#901c1c";
    textarea.setAttribute("aria-invalid", "true");
    errorTextarea.innerHTML =
      "* Veuillez laisser un message (min 10 caractères, max 400)";
    textarea.style.outline = "2px solid red";
    return false;
  } else {
    errorTextarea.style.color = "green";
    textarea.setAttribute("aria-invalid", "false");
    errorTextarea.innerHTML = '<span class="fa fa-check"></span>';
    textarea.style.outline = "none";
    return true;
  }
}

//********************************************************************************** //
// ---------------------------- ON SUBMIT VALIDATION EVENT ------------------------- //
//********************************************************************************** //

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
    messageSubmit.focus();
    return true;
  }
});
