import { DOM } from "./dom.js";
import { Handlers } from "./handlers.js";

let selectedTip = 15;

const Calculator = {
  // *calc logic for tip and bill per person
  calculate(billAmount, tipPercentage, numberOfPeople) {
    if (
      isNaN(billAmount) ||
      isNaN(tipPercentage) ||
      isNaN(numberOfPeople) ||
      billAmount <= 0 ||
      numberOfPeople <= 0
    ) {
      return { total: "$0.00", tip: "$0.00" };
    }

    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalBillPlusTip = billAmount + tipAmount;

    return {
      total: `$${(totalBillPlusTip / numberOfPeople).toFixed(2)}`,
      tip: `$${(tipAmount / numberOfPeople).toFixed(2)}`,
    };
  },

  updateTotal() {
    const billValue = parseFloat(DOM.bill.value);
    const numPeople = DOM.numberOfPeople.value.trim();
    const { total, tip } = this.calculate(billValue, selectedTip, numPeople);

    DOM.totalBillPerPerson.textContent = total;
    DOM.totalTipPerPerson.textContent = tip;
    Handlers.toggleResetButton();
  },

  getSelectedTip() {
    return selectedTip;
  },
  setSelectedTip(value) {
    selectedTip = value;
  },
};

export { Calculator };
