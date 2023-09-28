let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function makeMove(index) {
  if (board[index] === '' && !checkWin() && !checkTie()) {
    board[index] = currentPlayer;
    document.getElementById('board').children[index].innerText = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();

    if (checkWin()) {
      showPopup(`${currentPlayer === 'X' ? 'O' : 'X'} wins!`);
    } else if (checkTie()) {
      showPopup('It\'s a tie!');
    }
  }
}

function updateStatus() {
  const statusElement = document.getElementById('status');
  statusElement.innerText = `Current player: ${currentPlayer}`;
}

function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
  }
  hidePopup();
  updateStatus();
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }

  return false;
}

function checkTie() {
  return board.every(cell => cell !== '');
}

function showPopup(message) {
  const popupContainer = document.getElementById('popupContainer');
  const popupMessage = document.getElementById('popupMessage');
  popupMessage.innerText = message;
  popupContainer.classList.add('show-popup');
}

function hidePopup() {
  const popupContainer = document.getElementById('popupContainer');
  popupContainer.classList.remove('show-popup');
}
