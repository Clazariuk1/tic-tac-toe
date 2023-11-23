// (function() {

const LOOKUP = {
  '1': 'X',
  '-1': 'O',
  'null': ''
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let gameBoard, turn, winner;

const display = document.getElementById("display");
const gameBoardEl = document.getElementById('game-board')
const squareEls = document.querySelectorAll('.square');
const replayBtn = document.getElementById('replay');
const Xwins = document.getElementById('X-wins');
const Owins = document.getElementById('O-wins');
const gameTally = document.getElementById('game-tally');
let gamesTally = 0;
let XWINS = 0;
let OWINS = 0;

gameBoardEl.addEventListener("click", playerMove);
replayBtn.addEventListener("click", startGame, renderTally());

startGame();

function startGame() {
  gamesTally++;
  gameBoard = [null, null, null,
               null, null, null,
               null, null, null];
  turn = 1;
  winner = false;
  render();
}

function playerMove(event) {
  const position = event.target.dataset.index;
  if (winner || gameBoard[position] !== null) return;
  gameBoard[position] = turn;
  turn *= -1;
  winner = renderWinner();
  render();
}

function renderWinner() {
  for (let winningArray of winningCombos) {
    if (Math.abs(gameBoard[winningArray[0]] + gameBoard[winningArray[1]] + gameBoard[winningArray[2]]) === 3) {
      gamesTally++;
      return gameBoard[winningArray[0]];
    }
  }
  if (gameBoard.includes(null)) return false;
  return 'T';
}

function render() {
  renderBoard();
  renderDisplay();
  replayBtn.disabled = !winner;
}

function renderBoard() {
  squareEls.forEach(function(square, position) {
    square.textContent = LOOKUP[gameBoard[position]];

  });
}

function renderDisplay() {
  if (winner === 'T') {
    display.innerHTML = `Game Over; players are tied!`;
  } else if (winner) {
    display.innerHTML = `Congratulations <span style="Current Player: ${LOOKUP[winner]}">${LOOKUP[winner].toUpperCase()}</span>!`;
  } else {
    display.innerHTML = `<span style="Current Player: ${LOOKUP[turn]}">${LOOKUP[turn].toUpperCase()}</span>'s turn.`
  }
}

 function renderTally() {
//   if (winner) {
//     if (${LOOKUP[winner]} === LOOKUP[0]) {
//       XWINS++;
//     } else if (${LOOKUP[winner]} === LOOKUP[1]) {
//       OWINS++;
//     }
//     if (XWINS === 3) {
//       display.innerHTML = `Player X has won the best-of-three Championship!!`
//     } else if (OWINS === 3) {
//       display.innerHTML = `Player O has won the best-of-three Championship!!`
//     } else if (gamesTally === 5) {
//       display.innerHTML = `This tournament is a deadlocked tie! Refresh the page to start over.`
//     }
    gameTally.innerHTML = `${gamesTally}`;
//     XWins.innerHTML = `${XWINS}`;
//     OWins.innerHTML = `${OWINS}`;
//     return;
//     }
 }

// renderTally() {
//   let grandChampion = 3;
//   tallyCounter();
//   Xwins.innerHTML = `${XWINS}`;
//   Owins.innerHTML = `${OWINS}`;

//   if (XWINS === grandChampion) {
//     display.innerHTML = `Player X has won the best-of-three Championship!!`
//   } else if (OWINS === grandChampion) {
//     display.innerHTML = `Player O has won the best-of-three Championship!!`
//   }

//   function tallyCounter(winner) {
//   if (winner === '1') {
//     XWINS += 1;
//   } else if (winner === '-1') {
//     OWINS += 1;
//   }
// }
