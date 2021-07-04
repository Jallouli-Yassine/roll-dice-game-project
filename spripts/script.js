"use strict";

//game
const score0EL = document.querySelector("#score--0");
const score1EL = document.querySelector("#score--1");
const curentScoreE0 = document.querySelector("#current--0");
const curentScoreE1 = document.querySelector("#current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const diceEL = document.querySelector(".dice");
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
let score = 0;
let playerSelected = 0;
let endOfGame = 0;
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add("hidden");

if (endOfGame === 0) newGameBtn.classList.add("hidden");

function curentPlayer() {
  if (playerSelected === 0) return 0;
  return 1;
}

function switchPlayer() {
  score = 0;
  if (curentPlayer() === 0) {
    playerSelected = 1;
    if (player0.classList.contains("player--active")) {
      player0.classList.remove("player--active");
      player1.classList.add("player--active");
    }

    curentScoreE0.textContent = score;
  } else {
    playerSelected = 0;
    if (player1.classList.contains("player--active")) {
      player1.classList.remove("player--active");
      player0.classList.add("player--active");
    }
    curentScoreE1.textContent = score;
  }
}
/*
function theWinner() {
  if (
    (curentPlayer() === 0 && Number(curentScoreE0.textContent) >= 100) ||
    (curentPlayer() === 1 && Number(curentScoreE1.textContent) >= 100)
  )
    alert(`player ${curentPlayer() + 1} won`);
}
*/

// roll dice :
rollDiceBtn.addEventListener("click", () => {
  //const playerName1 = prompt("put the name of the player 1 : ");
  //const playerName2 = prompt("put the name of the player 2 : ");
  // generate number
  if (endOfGame === 0) {
    const diceNb = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `./pictures/dice-${diceNb}.png`;
    //check the number is 1 or no !
    if (diceNb !== 1) {
      //add nb to curent score
      score += diceNb;
      if (playerSelected === 0) curentScoreE0.textContent = score;
      else curentScoreE1.textContent = score;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener("click", () => {
  //init game
  endOfGame = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  playerSelected = 0;
  if (player1.classList.contains("player--active")) {
    player1.classList.remove("player--active");
    player0.classList.add("player--active");
  }
  diceEL.classList.add("hidden");
  if (player0.classList.contains("player--winner"))
    player0.classList.remove("player--winner");
  if (player1.classList.contains("player--winner"))
    player1.classList.remove("player--winner");
});

holdBtn.addEventListener("click", () => {
  //add curent score to the total
  let total;
  if (endOfGame === 0) {
    if (curentPlayer() === 0) {
      total = Number(score0EL.textContent) + score;
      score0EL.textContent = total;
      if (total >= 100) {
        player0.classList.add("player--winner");
        endOfGame = 1;
        newGameBtn.classList.remove("hidden");
      }

      total = 0;
    } else {
      total = Number(score1EL.textContent) + score;
      score1EL.textContent = total;
      if (total >= 100) {
        player1.classList.add("player--winner");
        endOfGame = 1;
        newGameBtn.classList.remove("hidden");
      }
      total = 0;
    }

    //if score >=100 , curent player win
    //else switch player
    switchPlayer();
  }
});
