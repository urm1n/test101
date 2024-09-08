const chessboard = document.getElementById("chessboard");

const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

// Unicode symbols for chess pieces
const chessPieces = {
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
let currentTurn = "white"; // Track player turns (white/black)
let board = JSON.parse(JSON.stringify(initialBoard)); // Copy of the board

// Render the chessboard
function renderBoard() {
  chessboard.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = (row + col) % 2 === 0 ? "white" : "black";
      square.dataset.row = row;
      square.dataset.col = col;

      const piece = board[row][col];
      if (piece) {
        square.innerHTML = `<span class="chess-piece">${chessPieces[piece]}</span>`;
      }

      square.addEventListener("click", () => onSquareClick(row, col));
      chessboard.appendChild(square);
    }
  }
}

// Handle piece selection and movement
function onSquareClick(row, col) {
  const piece = board[row][col];

  if (selectedPiece) {
    // Try to move the selected piece to this square
    if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
      board[row][col] = board[selectedPiece.row][selectedPiece.col];
      board[selectedPiece.row][selectedPiece.col] = "";
      currentTurn = currentTurn === "white" ? "black" : "white"; // Switch turns
      selectedPiece = null;
      renderBoard();
    } else {
      selectedPiece = null; // Deselect
    }
  } else if (piece && isCorrectTurn(piece)) {
    selectedPiece = { row, col };
  }
}

// Ensure only the correct player's pieces can be moved
function isCorrectTurn(piece) {
  return (
    (currentTurn === "white" && piece === piece.toUpperCase()) ||
    (currentTurn === "black" && piece === piece.toLowerCase())
  );
}

// Check if a move is valid (basic movement logic, no check/checkmate yet)
function isValidMove(startRow, startCol, endRow, endCol) {
  const piece = board[startRow][startCol];
  const target = board[endRow][endCol];

  // Prevent moving to a square occupied by your own piece
  if (
    (piece === piece.toUpperCase() && target === target.toUpperCase()) ||
    (piece === piece.toLowerCase() && target === target.toLowerCase())
  ) {
    return false;
  }

  // Basic movement rules (only pawn logic implemented here as an example)
  if (piece.toLowerCase() === "p") {
    const direction = piece === "P" ? -1 : 1; // White moves up, black moves down

    // Pawn moves forward one square
    if (
      endCol === startCol &&
      board[endRow][endCol] === "" &&
      endRow === startRow + direction
    ) {
      return true;
    }

    // Pawn captures diagonally
    if (
      Math.abs(endCol - startCol) === 1 &&
      endRow === startRow + direction &&
      board[endRow][endCol]
    ) {
      return true;
    }

    // Double move for pawns on the starting row
    if (
      endCol === startCol &&
      board[endRow][endCol] === "" &&
      startRow === (piece === "P" ? 6 : 1) &&
      endRow === startRow + direction * 2
    ) {
      return true;
    }
  }

  // Add logic for other pieces (knight, rook, bishop, queen, king)
  // ...

  return false;
}

renderBoard();
