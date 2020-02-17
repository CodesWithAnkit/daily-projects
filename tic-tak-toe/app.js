const X_class = 'x';
const Circle_class = 'circle';
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winningMessage');
const restartBtn = document.getElementById('restartButton');
const dataWinningMassage = document.querySelector(
  '[data-winning-message-text]'
);
let circleTurn;

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cellElement.forEach(cell => {
    cell.classList.remove(X_class);
    cell.classList.remove(Circle_class);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessage.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const curentClass = circleTurn ? Circle_class : X_class;
  placeMark(cell, curentClass);

  if (checkWin(curentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function endGame(draw) {
  if (draw) {
    dataWinningMassage.innerText = 'Draw!';
  } else {
    dataWinningMassage.innerText = `${circleTurn ? "O's" : "X's"} Wins`;
  }
  winningMessage.classList.add('show');
}

function isDraw() {
  return [...cellElement].every(
    cell =>
      cell.classList.contains(X_class) || cell.classList.contains(Circle_class)
  );
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_class);
  board.classList.remove(Circle_class);
  if (!circleTurn) {
    board.classList.add(X_class);
  } else {
    board.classList.add(Circle_class);
  }
}

function checkWin(currentClass) {
  return winningCombination.some(combination => {
    return combination.every(i =>
      cellElement[i].classList.contains(currentClass)
    );
  });
}
