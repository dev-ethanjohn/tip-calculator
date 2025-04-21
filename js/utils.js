function bounceInput(wrapper, duration = 250) {
  if (!wrapper) return;
  wrapper.classList.add("input-bounce");
  setTimeout(() => wrapper.classList.remove("input-bounce"), duration);
}

function inputErrorFeedback({
  wrapper,
  errorElement,
  message,
  duration = 2000,
}) {
  bounceInput(wrapper);
  if (errorElement) {
    errorElement.textContent = message;
    clearTimeout(inputErrorFeedback._timeout);
    inputErrorFeedback._timeout = setTimeout(() => {
      errorElement.textContent = "";
    }, duration);
  }
}

export { bounceInput, inputErrorFeedback };
