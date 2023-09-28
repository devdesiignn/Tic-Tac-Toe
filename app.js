"use strict";

const gridItems = document.querySelectorAll(".grid-item");

const scoreTile = document.querySelector(".score-tile");
const startBtn = document.querySelector(".start-game");
const resetBtn = document.querySelector(".reset-game");

let currentPlayer = "X";
let gameSessionOver = false;
const wins = [
  [11, 12, 13],
  [21, 22, 23],
  [31, 32, 33],
  [11, 21, 31],
  [12, 22, 32],
  [13, 23, 33],
  [11, 22, 33],
  [13, 22, 31],
];

let plays = [];
const playerX = [];
const playerO = [];
let playerXWins, playerOWins;

function play(event) {
  if (currentPlayer === "X") {
    event.target.textContent = "X";
    playerX.push(Number(event.target.dataset.box));
  } else {
    event.target.textContent = "O";
    playerO.push(Number(event.target.dataset.box));
  }

  plays = [...playerX, ...playerO];

  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function startGame() {
  console.log("GAME STARTED!");

  gridItems.forEach((gridItem) => {
    gridItem.addEventListener("click", (event) => {
      event.preventDefault();

      play(event);

      checkWinner();

      if (gameSessionOver === true) resetGame();
    });
  });
}

function resetGame() {
  gameSessionOver = false;
  plays.length = playerX.length = playerO.length = 0;

  setTimeout(() => {
    gridItems.forEach((gridItem) => (gridItem.textContent = ""));
    scoreTile.style.visibility = "hidden";
    scoreTile.style.opacity = 0;
    scoreTile.textContent = ``;
  }, 3000);
}

function checkWinner() {
  for (const winCombinations of wins) {
    playerXWins = winCombinations.every((winCombination) =>
      playerX.includes(winCombination)
    );

    playerOWins = winCombinations.every((winCombination) =>
      playerO.includes(winCombination)
    );

    if (playerXWins) {
      // console.log("PlayerX wins.");

      scoreTile.textContent = `PlayerX wins.`;
      break;
    } else if (playerOWins) {
      // console.log("PlayerO wins.");

      scoreTile.textContent = `PlayerO wins.`;
      break;
    }
  }

  scoreTile.style.visibility = "visible";
  scoreTile.style.opacity = 1;

  if (playerXWins || playerOWins) {
    gameSessionOver = true;
    console.log("GAME ENDED!");
  } else if (plays.length === 9) {
    // console.log("It's a draw");

    scoreTile.textContent = `It's a draw.`;
    gameSessionOver = true;
  }
}

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
