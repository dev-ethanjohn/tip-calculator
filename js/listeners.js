import { DOM } from "./dom.js";
import { Handlers } from "./handlers.js";

function setupEventListeners() {
  DOM.bill.addEventListener("input", Handlers.handleBillInput);
  DOM.bill.addEventListener("keydown", Handlers.handleBillKeyDown);
  DOM.numberOfPeople.addEventListener("input", Handlers.handlePeopleInput);
  DOM.numberOfPeople.addEventListener("keydown", Handlers.handlePeopleKeyDown);
  DOM.tipCustomInput.addEventListener("input", Handlers.handleCustomTipInput);
  DOM.tipGrid.addEventListener("change", Handlers.handleRadioTipChange);
  DOM.resetButton.addEventListener("click", Handlers.handleReset);

  // *for input focus and blur (away)
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", Handlers.handleInputFocus);
    input.addEventListener("blur", Handlers.handleInputBlur);
  });
}

export { setupEventListeners };
