const chessboard = document.getElementById("chessboard");
const gameStatus = document.getElementById("game-status");

let currentTurn = "white";
let selectedPiece = null;
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

// Handle tile click
function handleTileClick(row, col) {
  const piece = board[row][col];

  if (selectedPiece) {
    movePiece(selectedPiece.row, selectedPiece.col, row, col);
    clearHighlights();
    selectedPiece = null;
  } else if (piece && isCurrentPlayerPiece(piece)) {
    selectedPiece = { row, col };
    highlightAvailableMoves(row, col);
  }
}

// Check if the piece belongs to the current player
function isCurrentPlayerPiece(piece) {
  return (
    (currentTurn === "white" && piece === piece.toUpperCase()) ||
    (currentTurn === "black" && piece === piece.toLowerCase())
  );
}

// Highlight available moves
function highlightAvailableMoves(row, col) {
  clearHighlights();
  const moves = getAvailableMoves(row, col);

  moves.forEach((move) => {
    const tile = chessboard.querySelector(
      `[data-row="${move.row}"][data-col="${move.col}"]`
    );
    tile.classList.add("highlight");
  });
}

// Get available moves (simplified, only handles pawns)
function getAvailableMoves(row, col) {
  const piece = board[row][col];
  const moves = [];

  // Example: handle pawn movement
  if (piece === "P") {
    if (row > 0 && board[row - 1][col] === "") {
      moves.push({ row: row - 1, col: col });
    }
  }

  // Add logic for other pieces here

  return moves;
}

// Clear highlighted tiles
function clearHighlights() {
  document
    .querySelectorAll(".highlight")
    .forEach((tile) => tile.classList.remove("highlight"));
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
