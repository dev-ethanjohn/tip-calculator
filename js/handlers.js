import { Calculator } from "./calculator.js";
import { DOM } from "./dom.js";
import { bounceInput, inputErrorFeedback } from "./utils.js";
import { Validation } from "./validation.js";

const Handlers = {
  //* NOTE: handle custom tip input
  handleCustomTipInput() {
    const customTip = parseFloat(DOM.tipCustomInput.value); //? can accept floats

    // *IF INPUT IS VALID
    if (!isNaN(customTip)) {
      Calculator.setSelectedTip(customTip);
      document
        .querySelectorAll('input[name="tipPercentage"]')
        .forEach((r) => (r.checked = false)); //? uncheck all radio btn with name "tipPercentage"
      DOM.tipCustomInput.classList.add("is-active");
    } else {
      DOM.tipCustomInput.classList.remove("is-active");
    }

    // IMPORTANT: making sure new amounts are displayed
    Calculator.updateTotal();
  },

  //* NOTE: handle defined tip percentages
  handleRadioTipChange(e) {
    // *if is a radio (not custom tip input)
    if (e.target.matches('input[name="tipPercentage"]')) {
      const selectedRadioTip = Number(e.target.value);
      Calculator.setSelectedTip(selectedRadioTip); //? UPDATED selectedTIP

      // clear custom input value / styling
      DOM.tipCustomInput.value = "";
      DOM.tipCustomInput.classList.remove("is-active");

      // IMPORTANT: making sure new amounts are displayed
      Calculator.updateTotal();
    }
  },

  //* NOTE: Reset all that chnaged to initial state
  handleReset() {
    //* clear bill and number of people fields/UI content
    DOM.bill.value = "";
    DOM.numberOfPeople.value = "";
    DOM.totalBillPerPerson.textContent = "$0.00";
    DOM.totalTipPerPerson.textContent = "$0.00";
    Calculator.setSelectedTip(15);

    //* bring back checked* to selected (15%) radio btn
    document.querySelectorAll('input[name="tipPercentage"]').forEach((r) => {
      return (r.checked = r.value === "15");
    });
    DOM.tipCustomInput.value = "";
    DOM.tipCustomInput.classList.remove("is-active");

    //* remove any input active / error classes
    document
      .querySelectorAll("input")
      .forEach((input) =>
        input.classList.remove("input-active", "input-error")
      );

    //* reset bill and people error messages
    DOM.billError.textContent = "";
    DOM.peopleError.textContent = "";

    DOM.resetButton.disabled = true;
    DOM.resetButton.classList.remove("is-active");
  },

  //* NOTE: ENABLE/DISABLE RESET based on current state
  toggleResetButton() {
    const isNonZeroResults =
      DOM.totalTipPerPerson.textContent !== "$0.00" &&
      DOM.totalBillPerPerson.textContent !== "$0.00";

    const isValidPeople = Validation.isPeopleValid(
      DOM.numberOfPeople.value.trim()
    );
    const isValidBill = Validation.isBillValid(DOM.bill.value.trim());

    const shouldBeActive = isNonZeroResults && isValidPeople && isValidBill;

    DOM.resetButton.disabled = !shouldBeActive; //!NOTE: DISABLED

    // *add active styling if enabled
    shouldBeActive
      ? DOM.resetButton.classList.add("is-active")
      : DOM.resetButton.classList.remove("is-active");
  },

  handleBillInput() {
    //* If the bill input is invalid, do not update the totals UI
    if (!Validation.validateBillInput(DOM.bill)) {
      DOM.totalBillPerPerson.textContent = "$0.00";
      DOM.totalTipPerPerson.textContent = "$0.00";
      return;
    }

    //* set value to 1 regardless if
    if (DOM.numberOfPeople.value.trim() === "") {
      DOM.numberOfPeople.value = "1";
      Validation.validatePeopleInput(DOM.numberOfPeople);
    }

    // IMPORTANT: making sure new amounts are displayed
    Calculator.updateTotal();
  },

  handlePeopleInput() {
    Validation.validatePeopleInput(DOM.numberOfPeople);

    // IMPORTANT: making sure new amounts are displayed
    Calculator.updateTotal();
  },

  //NOTE: FEEDBACK UI STYLES
  handleInputFocus(e) {
    e.target.classList.add("input-active");
  },

  handleInputBlur(e) {
    e.target.classList.remove("input-active");
  },

  //NOTE:  filtering and feedback
  handleBillKeyDown(e) {
    const wrapper = e.target.closest(".calculator__input-wrapper");
    const allowed = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      ".",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
      ..."0123456789",
    ];

    //* animation haptics if there is !allowed
    if (!allowed.includes(e.key)) {
      e.preventDefault();
      bounceInput(wrapper);
      inputErrorFeedback({
        wrapper,
        errorElement: DOM.billError,
        message: "Only numbers and decimals allowed",
      });
      return;
    }

    // *prevent multiple decimals in the bill input
    if (e.key === "." && e.target.value.includes(".")) {
      e.preventDefault();
      bounceInput(wrapper);
      inputErrorFeedback({
        wrapper,
        errorElement: DOM.billError,
        message: "Only one decimal allowed",
      });
    }
  },

  //NOTE:  filtering and feedback
  handleBillKeyDown(e) {
    const wrapper = e.target.closest(".calculator__input-wrapper");
    const allowed = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      ".",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
      ..."0123456789",
    ];

    if (!allowed.includes(e.key)) {
      e.preventDefault();
      inputErrorFeedback({
        wrapper,
        errorElement: DOM.billError,
        message: "Only numbers and decimals allowed",
      });
      return; // ⛔️ Stop further checks
    }

    // * Prevent multiple decimals
    if (e.key === "." && e.target.value.includes(".")) {
      e.preventDefault();
      inputErrorFeedback({
        wrapper,
        errorElement: DOM.billError,
        message: "Only one decimal allowed",
      });
    }
  },

  handlePeopleKeyDown(e) {
    const wrapper = e.target.closest(".calculator__input-wrapper");
    const allowed = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
      ..."123456789",
    ];

    if (!allowed.includes(e.key)) {
      e.preventDefault();
      inputErrorFeedback({
        wrapper,
        errorElement: DOM.peopleError,
        message: "Only numbers allowed",
      });
      return;
    }

    // * prevent zero or negative starting values
    if (e.key === "-" || (e.key === "0" && e.target.value.trim() === "")) {
      e.preventDefault();
      inputErrorFeedback({
        wrapper,
        errorElement: DOM.peopleError,
        message: "Must start with 1 or higher",
      });
    }
  },
};

export { Handlers };
