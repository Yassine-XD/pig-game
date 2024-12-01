"use strict";

//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Startubg conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

//scores and points
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//switch player by change player card and active player value
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const endGame = function () {
  btnHold.disabled = true;
  btnRoll.disabled = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
};

const newGame = function () {
  //active buttons
  btnHold.disabled = false;
  btnRoll.disabled = false;
  playing = true;

  //remove winning background
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  //start with player 0 background active
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  //re-zero all values
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing === true) {
    //.1 Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing === true) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    //End Game
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceEl.classList.add("hidden");
    } else {
      //3. Switch to next Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  newGame();
});
