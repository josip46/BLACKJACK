'use strict';

const dealcardBtn = document.querySelector('.deal-card');
const holdBtn = document.querySelector('.hold');
const playAgainBtn = document.querySelector('.play-again');
const score = document.querySelector('.player-score');
const comScore = document.querySelector('.com-score');
const text = document.querySelector('.text-info');
let sum;
let numOfAcesAs11 = 0;
let playing = true;

const symbols = ['hearts', 'spades', 'diamonds', 'clubs'];
let cardsValue = [];
let compValue = [];

// Function that check scores
function checkScore(arr) {
  sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 1) {
      sum += arr[i];
    } else {
      if (sum + 11 <= 21) {
        sum += 11;
        numOfAcesAs11++;
      } else {
        sum++;
      }
    }
  }
  if (sum > 21 && numOfAcesAs11 > 0) {
    sum -= 10;
    numOfAcesAs11--;
  }
  return sum;
}

// Function that deals card
function dealCard(arr) {
  const randomNumber = Math.trunc(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    arr.push(10);
  } else if (randomNumber === 1) {
    arr.push(1);
  } else {
    arr.push(randomNumber);
  }
  const randomSymbol = Math.trunc(Math.random() * 4);
  return `/cards/${randomNumber}_of_${symbols[randomSymbol]}.png`;
}

function startingDeal() {
  // Deal two cards for a player
  document.querySelector('.playerCard1').src = dealCard(cardsValue);
  document.querySelector('.playerCard2').src = dealCard(cardsValue);
  score.textContent = checkScore(cardsValue);

  // Give computer first card
  document.querySelector('.comCard1').src = dealCard(compValue);
  checkScore(compValue);
  comScore.textContent = checkScore(compValue);
}

// Give two cards to a player and one to computer
startingDeal();

// Giving button function to add cards for the player
let currentCard = 3;
dealcardBtn.addEventListener('click', function () {
  if (playing) {
    document.querySelector(`.playerCard${currentCard}`).src =
      dealCard(cardsValue);
    currentCard++;
    checkScore(cardsValue);
    score.textContent = checkScore(cardsValue);
    if (checkScore(cardsValue) > 21) {
      text.textContent = 'You lost 😣!';
      giveCompCards();
      playing = false;
    }
  }
});

// Give computer rest of the cards
function giveCompCards() {
  let currentCom = 2;
  while (checkScore(compValue) < 17) {
    document.querySelector(`.comCard${currentCom}`).src = dealCard(compValue);
    currentCom++;
    checkScore(compValue);
    comScore.textContent = checkScore(compValue);
  }
}

// Giving hold button a function
holdBtn.addEventListener('click', function () {
  playing = false;
  giveCompCards();
  if (checkScore(cardsValue) > 21) {
    text.textContent = 'You lost 😣!';
  } else if (
    checkScore(compValue) > 21 ||
    checkScore(cardsValue) > checkScore(compValue)
  ) {
    text.textContent = 'You win 🏆🏆🏆';
  } else if (checkScore(cardsValue) < checkScore(compValue)) {
    text.textContent = 'You lost 😣!';
  } else {
    text.textContent = 'It is a draw!';
  }
});

// Play again button function
playAgainBtn.addEventListener('click', function () {
  for (let i = 1; i < 12; i++) {
    document.querySelector(`.playerCard${i}`).src = '';
    document.querySelector(`.comCard${i}`).src = '';
  }
  text.textContent = "Let's play a game!";
  currentCard = 3;
  playing = true;
  numOfAcesAs11 = 0;
  cardsValue = [];
  compValue = [];
  score.textContent = 0;
  comScore.textContent = 0;
  startingDeal();
});
