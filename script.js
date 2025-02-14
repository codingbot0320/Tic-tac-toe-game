// script.js
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');

let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const lightColors = [
  '#FFDDC1', '#FFC3A0', '#FFABAB', '#FF677D', '#D4A5A5', 
  '#392F5A', '#31A2AC', '#61C0BF', '#6B4226', '#D9BF77'
];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (clickedCellEvent) => {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !isGameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());

  checkResult();
};

const checkResult = () => {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      highlightWinningCells(winCondition);
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `${currentPlayer} wins!`;
    isGameActive = false;
    showCelebration();
    return;
  }

  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    statusDisplay.innerHTML = `Draw!`;
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
};

const highlightWinningCells = (winCondition) => {
  winCondition.forEach(index => {
    cells[index].style.backgroundColor = '#90ee90';
  });
};

const showCelebration = () => {
  const confettiCount = 100;
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
};

const restartGame = () => {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('x', 'o');
    cell.style.backgroundColor = '#fff';
  });
  changeBackgroundColor();
};

const changeBackgroundColor = () => {
  const randomColor = lightColors[Math.floor(Math.random() * lightColors.length)];
  document.body.style.background = randomColor;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;

// Add background animation element
const backgroundAnimation = document.createElement('div');
backgroundAnimation.classList.add('background-animation');
document.body.appendChild(backgroundAnimation);
