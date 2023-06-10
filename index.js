function fetchSuggestions(text) {
  const results = ["pretest", "testing", "tested"];

  return new Promise((resolve) => {
    const time = Math.floor(Math.random() * 200) + 1;
    setTimeout(() => {
      resolve(text === "test" ? results : []);
    }, time);
  });
}

// ADD CODE HERE

const suggestions = document.getElementById("suggestions");
const resultsContainer = document.getElementById("results");
const input = document.getElementById("input");

function renderResults(results) {
  // create ul
  const container = document.createElement("ul");
  resultsContainer.appendChild(container);
  // add li's
  results.forEach((result) => {
    const resultLi = document.createElement("li");
    resultLi.textContent = result;
    container.appendChild(resultLi);
  });
}

async function onInputChange(event) {
  const word = event.target.value.split(" ").pop();
  const results = await fetchSuggestions(word);
  // clear results
  resultsContainer.innerHTML = "";
  if (results && results.length) {
    // render results
    renderResults(results);
  }
}

function onResultSelect(event) {
  if (event.target.tagName === "LI") {
    event.preventDefault();
    input.value = event.target.textContent + " ";
  }
}

function onHideResults() {
  resultsContainer.classList = "hide";
}
function onShowResults() {
  resultsContainer.classList = "show";
}

suggestions.addEventListener("mousedown", onResultSelect);
suggestions.addEventListener("keyup", onInputChange);
suggestions.addEventListener("focusout", onHideResults);
suggestions.addEventListener("focusin", onShowResults);
