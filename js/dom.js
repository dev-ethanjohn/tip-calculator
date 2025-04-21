const DOM = {
  bill: document.querySelector(".calculator__input--bill"),
  numberOfPeople: document.getElementById("people"),
  tipGrid: document.querySelector(".calculator__tip-grid"),
  tipCustomInput: document.getElementById("tipCustom"),
  totalBillPerPerson: document.getElementById("totalAmount"),
  totalTipPerPerson: document.getElementById("tipAmount"),
  resetButton: document.getElementById("resetButton"),
  peopleError: document.getElementById("peopleError"),
  billError: document.getElementById("billError"),
};

export { DOM };
