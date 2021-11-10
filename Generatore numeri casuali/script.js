const generateBtn = document.querySelector(".generatore");
const counterText = document.querySelector(".number-display");
const inputInferiorEl = document.querySelector("#limite-inferiore");
const inputSuperiorEl = document.querySelector("#limite-superiore");
const settingsButton = document.querySelector(".impostazioni");
const excludedNumbersEl = document.querySelector("#numeri-esclusi");
const menuOptions = document.querySelector("#titolo-textarea");
const saveButton = document.querySelector("#save-button");
const esclusip = document.querySelector("#esclusi-p");
const savep = document.querySelector("#save-p");

let counter = 1;
counterText.textContent = counter;

let exclusionsRaw;
let exclusionsArray;
let excArrayLength;

excludedNumbersEl.value = localStorage.getItem("numeri estratti");

settingsButton.addEventListener("click", () => {
  excludedNumbersEl.classList.toggle("hidden");
  menuOptions.classList.toggle("hidden");
  saveButton.classList.toggle("hidden");
  esclusip.classList.toggle("hidden");
  savep.classList.toggle("hidden");
  menuOptions.focus();
});

generateBtn.addEventListener("click", () => {
  if (!inputInferiorEl.value) {
    inputInferiorEl.value = 1;
  }

  if (!inputSuperiorEl.value) {
    inputSuperiorEl.value = 2;
  }

  if (inputSuperiorEl.value < inputInferiorEl.value) {
    inputInferiorEl.value = 1;
    inputSuperiorEl.value = 2;
  }

  console.log("Nuova generazione");

  counter = randGen(inputInferiorEl.value, inputSuperiorEl.value);
  counterText.textContent = counter;
  console.log(`Risultato scelto: ${result}`);
});

function randGen(min, max) {
  min = Math.floor(min);
  max = Math.ceil(max);

  exclusionsRaw = excludedNumbersEl.value;
  exclusionsArray = exclusionsRaw.split("\n");

  result = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(result);

  for (let i = 0; i < exclusionsArray.length; i++) {
    if (result == exclusionsArray[i]) {
      console.log(`risultato escluso: ${result}`);
      randGen(inputInferiorEl.value, inputSuperiorEl.value);
    }
  }

  return result;
}

saveButton.addEventListener("click", () => {
  localStorage.setItem("numeri estratti", excludedNumbersEl.value);
});
