const modal = document.getElementById("contact_modal");
const modalContent = document.querySelector(".modal");
const btnSubmit = document.querySelector("#submit-button");
const contactForm = document.querySelector("#contact-form");
const inputsContainer = document.querySelector("#form-inputs");
const inputFirstname = document.querySelector("#firstname");
const inputLastname = document.querySelector("#lastname");
const inputEmail = document.querySelector("#email");
const textarea = document.querySelector("#message");
const inputs = document.querySelectorAll(".form-input");

// Create element paragraph for message when submit succeed
const pSubmit = document.createElement("p");
pSubmit.classList.add("message-submit");
pSubmit.innerHTML =
  "Votre message a bien été envoyé !<br>Nous vous recontacterons dès que possible.";
modalContent.appendChild(pSubmit);
const messageSubmit = document.querySelector(".message-submit");

// Regex
const regexText =
  /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,\'\.\s-]{2,50}$/g;
const regexEmail =
  /^([\w/\_\\!#$%&£'\]\[*+=?^`{|}~"()\.,:;<>@-]{1,}[\@][a-zA-Z]{1,}[\.][a-zA-Z]{2,})$/;

// Create containers for error messages
inputs.forEach((input) => {
  const errorData = document.createElement("div");
  errorData.classList.add("error-data");
  inputsContainer.insertBefore(errorData, input);
  errorData.style.display = "none";
});

// Variables for each message error
const errorData = document.querySelectorAll(".error-data");
const errorFirstname = errorData[0];
const errorLastname = errorData[1];
const errorEmail = errorData[2];
const errorTextarea = errorData[3];

// Functions to open/close modal
function displayModal() {
  modal.style.display = "block";
  contactForm.style.display = "block";
  messageSubmit.style.display = "none";
  contactForm.reset();
  errorData.forEach((error) => {
    error.style.display = "none";
  });
}
function closeModal() {
  modal.style.display = "none";
}

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
    return false;
  } else {
    errorReference.style.color = "green";
    errorReference.innerHTML = '<i class="fa fa-check"></i>';
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
    return false;
  } else {
    errorTextarea.style.color = "green";
    errorTextarea.innerHTML = '<i class="fa fa-check"></i>';
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
    return true;
  }
});
