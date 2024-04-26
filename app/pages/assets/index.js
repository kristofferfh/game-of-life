import { createBoard, drawBoard, updateBoard } from "./scripts/gol.js";

// Containers
const container = document.getElementById("main");

// Input values
let boardHeight = 200;
let boardWidth = 300;
let gameSpeed = 10;
let boardWrap = false;

// States
let gameInterval = null;
let gameTic = 0;
let stuckCount = 0;
let gamePaused = true;
let boardState = createBoard(boardHeight, boardWidth, true);

// Update the dom with new game state
const updateBoardDom = () => {
  const next = updateBoard(boardState)

  // Game is starting to loop, pausing
  if (stuckCount > 100000) gamePause()

  for (let rowIndex = 0; rowIndex < boardState.length; rowIndex++) {
    for (let collumnIndex = 0; collumnIndex < boardState[rowIndex].length; collumnIndex++) {
      if (boardState[rowIndex][collumnIndex] !== next[rowIndex][collumnIndex]) {
        // Something went wrong, ill fix this later
      }

      const cell = document.getElementById(`cell-${rowIndex + 1}-${collumnIndex + 1}`)
      if (next[rowIndex][collumnIndex]) {
        cell.className = 'alive'
      } else {
        cell.className = ''
      }
    }
  }

  // Increment game
  gameTic++

  // Display tic frame
  const displayTic = document.getElementById("tic-count")
  displayTic.textContent = gameTic + "-" + stuckCount

  // Rewrites game state with new data
  boardState = next
}

// Game state toggles
const gameStart = (tic) => {

  // Game is already running, skip click
  if (!gamePaused) return

  // Invalid speed from input element
  if (gameSpeed > 99) return console.log("Invalid speed")

  // Reset interval to avoid duplicate runs
  clearInterval(gameInterval)
  gameInterval = setInterval(() => updateBoardDom(), 200 - (gameSpeed * 10))
  gamePaused = false
  stuckCount = 0;
}

const gamePause = () => {
  if (!gamePaused) {
    // Stop timing function
    clearInterval(gameInterval)
    gamePaused = true
  }
}

const gameRandom = () => {
  // Stop timing function
  clearInterval(gameInterval)

  // Reset game state
  gameTic = 0
  gameInterval = null;
  gamePaused = true
  boardState = createBoard(boardHeight, boardWidth, true)
  updateBoardDom()
}

const gameClear = () => {
  // Stop timing function
  clearInterval(gameInterval)

  // Reset game state
  gameTic = 0
  gameInterval = null;
  gamePaused = true
  boardState = createBoard(boardHeight, boardWidth)
  updateBoardDom()
}

// Adding event listener to Input fields
const boardHeightInput = document.getElementById("game-height").addEventListener("change", e => boardHeight = e.target.value * 1);
const boardWidthInput = document.getElementById("game-width").addEventListener("change", e => boardWidth = e.target.value * 1);
const inputSpeedInput = document.getElementById("game-speed").addEventListener("change", e => gameSpeed = e.target.value * 1);
const toggleWrapInput = document.getElementById("game-wrap").addEventListener("change", e => boardWrap = e.target.checked);

const inputStart = document.getElementById("game-start").addEventListener("click", gameStart);
const inputPause = document.getElementById("game-pause").addEventListener("click", gamePause);
const inputRandom = document.getElementById("game-random").addEventListener("click", gameRandom);
const inputClear = document.getElementById("game-clear").addEventListener("click", gameClear);
const inputIncrement = document.getElementById("game-increment").addEventListener("click", updateBoardDom);
const inputLog = document.getElementById("game-log").addEventListener("click", () => {
  console.log(boardState)
});

// Draw board on window load
container.appendChild(drawBoard(boardState))