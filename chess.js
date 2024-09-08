const chessboard = document.getElementById("chessboard");
const gameStatus = document.getElementById("game-status");

let currentTurn = "white";
let board = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const pieces = {
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  p: "♟",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  P: "♙",
};

let selectedPiece = null;

// Initialize the board
function initBoard() {
  chessboard.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = document.createElement("div");
      tile.classList.add((row + col) % 2 === 0 ? "white-tile" : "black-tile");
      tile.dataset.row = row;
      tile.dataset.col = col;

      const piece = board[row][col];
      if (piece) {
        const pieceElem = document.createElement("span");
        pieceElem.classList.add("chess-piece");
        pieceElem.textContent = pieces[piece];
        tile.appendChild(pieceElem);
      }

      tile.addEventListener("click", () => handleTileClick(row, col));
      chessboard.appendChild(tile);
    }
  }
}

function handleTileClick(row, col) {
  if (selectedPiece) {
    movePiece(selectedPiece.row, selectedPiece.col, row, col);
    selectedPiece = null;
  } else if (board[row][col] && isCurrentPlayerPiece(board[row][col])) {
    selectedPiece = { row, col };
  }
}

// Check if the piece belongs to the current player
function isCurrentPlayerPiece(piece) {
  return (
    (currentTurn === "white" && piece === piece.toUpperCase()) ||
    (currentTurn === "black" && piece === piece.toLowerCase())
  );
}

function movePiece(startRow, startCol, endRow, endCol) {
  if (isValidMove(startRow, startCol, endRow, endCol)) {
    board[endRow][endCol] = board[startRow][startCol];
    board[startRow][startCol] = "";
    currentTurn = currentTurn === "white" ? "black" : "white";
    gameStatus.textContent = `${capitalize(currentTurn)} to move`;
    initBoard();
  }
}

function isValidMove(startRow, startCol, endRow, endCol) {
  // Implement full chess rules here (piece-specific movement)
  return true;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

initBoard();
