const inputField = document.querySelector(".display-screen");
const buttons = document.querySelectorAll(".btn");

let expression = "";

// funtion to display with current expression or 0
function showExpression() {
  inputField.value = formatDisplay(expression) || "0";
}

// funtion to add value to the current expression
function addToExpression(value) {
  expression += value;
  showExpression();
}

// funtion to remove the last character from the expression
function removeLastCharacter() {
  expression = expression.slice(0, -1);
  showExpression();
}

// funtion to reset the entire expression
function resetExpression() {
  expression = "";
  showExpression();
}

// function to calculate the result from the current expression
function calculateResult() {
  try {
    const parsedExpression = expression
      .replace(/,/g, "") // remove commas for calculation
      .replace(/×/g, "*")
      .replace(/−/g, "-")
      .replace(/\^/g, "**")
      .replace(/\%/g, "%");

    const result = Function(`"use strict"; return (${parsedExpression})`)();
    expression = result.toString();
    showExpression();
  } catch (error) {
    expression = "Error";
    showExpression();
    setTimeout(() => {
      expression = "";
      showExpression();
    }, 1500);
  }
}

// funtion for event listeners for all calculator buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();

    if (
      button.classList.contains("btn-number") ||
      button.classList.contains("btn-decimal")
    ) {
      addToExpression(value);
    } else if (button.classList.contains("btn-operator")) {
      addToExpression(value);
    } else if (button.classList.contains("btn-equals")) {
      calculateResult();
    } else if (button.classList.contains("btn-backspace")) {
      removeLastCharacter();
    } else if (button.classList.contains("btn-clear")) {
      resetExpression();
    }
  });
});

showExpression();

// function to add commas to display
function formatDisplay(expr) {
  return expr.replace(/\d+(\.\d+)?/g, (match) => {
    const [intPart, decimalPart] = match.split(".");
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart ? `${withCommas}.${decimalPart}` : withCommas;
  });
}
