let firstNumber = "";
let secondNumber = "";
let modifier = "";
let operation = "";
let expression = "";
let auto = false;

whichNumber = true;

const inputDisplay = document.querySelector(".input");
const outputDisplay = document.querySelector(".output");

const numbers = document.querySelectorAll(".number-btn");

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (whichNumber) {
      if (auto) {
        console.log("autoed");
        auto = !auto;
        firstNumber = "";
        expression = "";
        inputDisplay.innerHTML = expression;
      }
      firstNumber += button.dataset.value;
      console.log("first: " + firstNumber);
      expression += button.dataset.value;
    } else {
      secondNumber += button.dataset.value;
      console.log("second: " + secondNumber);
      expression += button.dataset.value;
    }
    inputDisplay.innerHTML = expression;
  });
});

const modifiers = document.querySelectorAll(".modifier-btn");

modifiers.forEach((button) => {
  button.addEventListener("click", () => {
    modifier = button.dataset.function;
    if (modifier === "clear") {
      resetState();
      modifier = "";
      inputDisplay.innerHTML = expression;
      outputDisplay.innerHTML = expression;
    }

    if (modifier === "inverse") {
      if (whichNumber && operation === "") {
        firstNumber *= -1;
        expression = firstNumber;
        inputDisplay.innerHTML = expression;
      } else if (!whichNumber && operation !== "") {
        secondNumber *= -1;
        expression = `${firstNumber} ${operation} ${secondNumber}`;
        inputDisplay.innerHTML = expression;
      } else {
        console.log(whichNumber);
        error();
      }
    }
  });
});

const operations = document.querySelectorAll(".operator-btn");

operations.forEach((button) => {
  button.addEventListener("click", () => {
    operation = button.dataset.operation;
    const storeOperation = operation;
    if (firstNumber != "" && secondNumber != "") {
      calculate();
      console.log(operation);

      if (operation === "calculate") {
        operation = storeOperation;
        expression += operation;
        console.log(expression);
        alert(operation);
      }
    } else {
      if (operation === "calculate") {
        console.log(firstNumber);
        console.log(secondNumber);
        error();
      } else {
        expression += " " + operation + " ";
        whichNumber = !whichNumber;
        inputDisplay.innerHTML = expression;
      }
    }
  });
});

function calculate() {
  const output = eval(expression);
  outputDisplay.innerHTML = output;
  console.log(output);
  resetState();
  auto = true;
  console.log(auto);
  firstNumber = output;
  expression += firstNumber + " ";
}

function resetState() {
  firstNumber = "";
  secondNumber = "";
  modifier = "";
  operation = "";
  expression = "";

  whichNumber = true;
}

function error() {
  resetState();
  outputDisplay.innerText = "error";
  inputDisplay.innerHTML = "";
}
