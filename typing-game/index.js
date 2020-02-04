const RANDOM_QUOTE = 'http://api.quotable.io/random';
const displayQuote = document.getElementById('quoteDisplay');
const inputQuote = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');

function getRandomQuote() {
  return fetch(RANDOM_QUOTE)
    .then(respose => respose.json())
    .then(data => data.content);
}

// getting the value from api and render it into span element
async function renderNewQuote() {
  const quote = await getRandomQuote();
  displayQuote.innerHTML = '';
  quote.split('').forEach(char => {
    const charSpan = document.createElement('span');
    charSpan.innerText = char;
    displayQuote.appendChild(charSpan);
  });
  inputQuote.value = null;
  startTimer();
}

renderNewQuote();

// checking the value

inputQuote.addEventListener('input', () => {
  const arrayQuote = displayQuote.querySelectorAll('span');
  const arrayValue = inputQuote.value.split('');
  let correct = true;
  arrayQuote.forEach((charSpan, index) => {
    const char = arrayValue[index];
    if (char == null) {
      charSpan.classList.remove('correct');
      charSpan.classList.remove('incorrect');
      correct = false;
    } else if (char === charSpan.innerText) {
      charSpan.classList.add('correct');
      charSpan.classList.remove('incorrect');
    } else {
      charSpan.classList.remove('correct');
      charSpan.classList.add('incorrect');
      correct = false;
    }
  });
  if (correct) renderNewQuote();
});

// Timer fuction

let startTime;

function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}
