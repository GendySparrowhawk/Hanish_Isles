const outputDiv = document.querySelector('#output');

export function render(hbsFunction, data) {
  outputDiv.innerHTML = hbsFunction(data);
}