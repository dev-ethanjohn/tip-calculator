import { DOM } from "./dom.js";

const Validation = {
  isBillValid(value) {
    return (
      /^([0-9]+(\.[0-9]*)?|\.[0-9]+)$/.test(value) && parseFloat(value) > 0
    );
  },

  isPeopleValid(value) {
    return /^[1-9]\d*$/.test(value);
  },

  validateBillInput(inputElement) {
    const value = inputElement.value.trim();
    const isValid = this.isBillValid(value);
    const wrapper = inputElement.closest(".calculator__input-wrapper");

    if (!isValid) {
      inputElement.classList.add("input-error");
      DOM.billError.textContent = "Valid amount only";

      wrapper?.classList.add("input-bounce");
      setTimeout(() => wrapper?.classList.remove("input-bounce"), 250);
      return false;
    }

    inputElement.classList.remove("input-error");
    DOM.billError.textContent = "";
    return true;
  },

  validatePeopleInput(inputElement) {
    const value = inputElement.value.trim();
    const isValid = this.isPeopleValid(value);
    const wrapper = inputElement.closest(".calculator__input-wrapper");

    if (!isValid) {
      inputElement.classList.add("input-error");
      inputElement.classList.remove("input-active");
      DOM.peopleError.textContent = "Must be greater than 0";

      wrapper?.classList.add("input-bounce");
      setTimeout(() => wrapper?.classList.remove("input-bounce"), 250);
      return false;
    }

    inputElement.classList.remove("input-error");
    if (document.activeElement === inputElement) {
      inputElement.classList.add("input-active");
    }
    DOM.peopleError.textContent = "";
    return true;
  },
};

export { Validation };
