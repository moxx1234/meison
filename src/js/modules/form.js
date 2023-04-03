// Переменные
const footer = document.querySelector("footer");
const form = footer.querySelector(".form");
const textInputs = form.querySelectorAll(".form__input");
const formButton = form.querySelector("button");
const nameInput = form.querySelector('input[name="input-name"]');
const telInput = form.querySelector('input[name="input-tel');
const checkbox = form.querySelector(".form__input_checkbox");
const formSentBlock = footer.querySelector(".footer__form-sent");
const resendBtn = footer.querySelector("#resend");

// Регулярные выражения
const forbiddenSymbols = new RegExp("[\\D]");

// Функции
const removeErrors = () => {
  let errors = form.querySelectorAll(".error");
  errors.forEach((error) => {
    error.remove();
  });
};
const showError = (field, errorText) => {
  let error = document.createElement("p");
  error.className = "error";
  error.style.color = "red";
  error.style.position = "absolute";
  error.style.bottom = "-1.125rem";
  error.style.right = "0";
  error.innerHTML = errorText;
  field.parentElement.insertBefore(error, field);
};
const checkForEmptyField = (inputs) => {
  inputs.forEach((input) => {
    if (!input.value) {
      showError(input, "Заполните поле");
    }
  });
};
const checkInputState = () => {
  if (!checkbox.checked) {
    let error = document.createElement("p");
    error.className = "error";
    error.style.color = "red";
    error.style.position = "absolute";
    error.style.top = "0";
    error.style.left = "100%";
    error.innerHTML = "*";
    checkbox.parentElement.insertBefore(error, checkbox);
  }
};
const checkIfErrorsOccur = () => {
  let errors = form.querySelectorAll(".error");
  if (errors.length > 0 || telInput.style.borderBottom == "1px solid red") {
    return false;
  } else {
    submitForm();
  }
};
const submitForm = () => {
  hideForm();
  formSentBlock.classList.add("active");
  formSentBlock.style.transform = "translateX(0)";
};
const resendForm = () => {
  hideFormSentBlock();
  form.classList.add("active");
  form.style.transform = "translateX(0)";
};
const hideForm = () => {
  textInputs.forEach((input) => {
    input.value = "";
  });
  form.classList.remove("active");
  form.style.transform = "translateX(-50%)";
};
const hideFormSentBlock = () => {
  formSentBlock.classList.remove("active");
  formSentBlock.style.transform = "translateX(50%)";
};

// Слушатели
form.addEventListener("submit", (event) => {
  event.preventDefault();
  removeErrors();
  checkForEmptyField(textInputs);
  checkInputState();
  checkIfErrorsOccur();
});
telInput.onfocus = function () {
  if (telInput.value.match(forbiddenSymbols)) {
    telInput.style.borderBottom = "1px solid red";
  } else {
    telInput.style.borderBottom = "1px solid #000";
  }
  telInput.addEventListener("input", () => {
    if (telInput.value.match(forbiddenSymbols)) {
      telInput.style.borderBottom = "1px solid red";
    } else {
      telInput.style.borderBottom = "1px solid #000";
    }
  });
};
telInput.onblur = function () {
  telInput.style.borderBottom = "1px solid #797979";
  if (telInput.value.match(forbiddenSymbols)) {
    telInput.style.borderBottom = "1px solid red";
  }
};
resendBtn.addEventListener("click", resendForm);
