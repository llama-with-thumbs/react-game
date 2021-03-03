"use strict";
class EmojiCard {
  open = false;
  active = true;

  domElement;
  emoji;
  domCardFace;
  cardId;

  constructor(domElement) {
    this.domElement = domElement;
    this.cardId = domElement.id;
  }
}
class GameBord {
  allCards = {};
  openCards = {};

  greenCards = {};
  redCards = {};

  gameScore = "Lose";

  allEmoojis = [];
  emojiContainerClass = "";

  constructor(gameBordId, emojiConClass, quantity, cardDeck) {
    this.emojiContainerClass = emojiConClass;
    this.allEmoojis = cardDeck;

    this.multiplyCards(gameBordId, quantity);
    this.placeEmoji(cardDeck, emojiConClass);
    this.setTimer("body");
  }

  makeGreen(openCards, greenCards) {
    Object.keys(openCards).forEach(function (cardId) {
      if (openCards[cardId].active) {
        openCards[cardId].domCardFace.style.backgroundColor = "#5AD66F";
        openCards[cardId].domCardFace.style.borderColor = "#5AD66F";
        openCards[cardId].active = false;

        openCards[cardId].domElement.classList.add("green");

        greenCards[cardId] = openCards[cardId];
        delete openCards[cardId];
      }
    });
  }
  makeRed(openCards, redCards) {
    Object.keys(openCards).forEach(function (cardId) {
      if (openCards[cardId].active) {
        openCards[cardId].domCardFace.style.backgroundColor = "#F44336";
        openCards[cardId].domCardFace.style.borderColor = "#F44336";
        openCards[cardId].active = true;

        redCards[cardId] = openCards[cardId];
        delete openCards[cardId];
      }
    });
  }
  makeWhite(card) {
    card.domCardFace.style.backgroundColor = "white";
    card.domCardFace.style.borderColor = "white";
    card.active = true;
  }
  open(card) {
    card.open = true;
    card.domCardFace.parentElement.classList.add("flipped");
    this.openCards[card.cardId] = card;

    var cardIdList = Object.keys(this.openCards);
    var redCardIdList = Object.keys(this.redCards);

    if (cardIdList.length == 2 && redCardIdList.length == 0) {
      if (
        this.openCards[cardIdList[0]].emoji !=
        this.openCards[cardIdList[1]].emoji
      ) {
        this.makeRed(this.openCards, this.redCards);
      } else {
        this.makeGreen(this.openCards, this.greenCards);
        this.testResult(); //testing ether or not all cards are opened
      }
    } else if (redCardIdList.length != 0) {
      this.close();
      card.open = true;
      card.domCardFace.parentElement.classList.add("flipped");
      this.openCards[card.cardId] = card;
    }
  }
  close() {
    for (
      var i = 0, cardIdList = Object.keys(this.openCards);
      i < cardIdList.length;
      i++
    ) {
      this.openCards[cardIdList[i]].domCardFace.parentElement.classList.remove(
        "flipped"
      );
      this.openCards[cardIdList[i]].open = false;
      this.makeWhite(this.openCards[cardIdList[i]]);
      delete this.openCards[cardIdList[i]];
    }

    for (
      var i = 0, cardIdList = Object.keys(this.redCards);
      i < cardIdList.length;
      i++
    ) {
      this.redCards[cardIdList[i]].domCardFace.parentElement.classList.remove(
        "flipped"
      );
      this.redCards[cardIdList[i]].open = false;
      this.makeWhite(this.redCards[cardIdList[i]]);
      delete this.redCards[cardIdList[i]];
    }
  }

  flip(card) {
    if (card.open && card.active) {
      this.close();
    } else if (!card.open && card.active) {
      this.open(card);
    }
  }

  multiplyCards(gameBordId, quantity) {
    for (var i = 0; i < quantity; i++) {
      var card = document
        .getElementById(gameBordId)
        .firstElementChild.cloneNode(true);
      card.id = card.id + "-" + i;
      this.allCards[card.id] = new EmojiCard(card);
      for (
        var j = 0, nodeList = card.querySelectorAll("*");
        j < nodeList.length;
        j++
      ) {
        nodeList[j].id = nodeList[j].id + "-" + i;
        nodeList[j].dataset.card = card.id;
      }
      document.getElementById(gameBordId).appendChild(card);
    }
    document.getElementById(gameBordId).firstElementChild.remove();
  }

  placeEmoji(cardDeck, emojiConClass) {
    let selectedEmoji = shuffleArray(cardDeck).slice(
      0,
      Object.keys(this.allCards).length / 2
    );
    selectedEmoji = selectedEmoji.concat(selectedEmoji);

    shuffleArray(selectedEmoji);

    for (var i = 0; i < Object.keys(this.allCards).length; i++) {
      var card = this.allCards[Object.keys(this.allCards)[i]];

      card.emoji = selectedEmoji[i];

      card.domCardFace = card.domElement.querySelector("." + emojiConClass);

      if (card.domCardFace.innerHTML) {
        card.domCardFace.removeChild(card.domCardFace.firstChild);
        card.domCardFace.appendChild(document.createTextNode(card.emoji));

        // card.domElement.lastElementChild.lastElementChild.removeChild(card.domElement.lastElementChild.lastElementChild.firstChild); // ***putting emoji on the card back
        // card.domElement.lastElementChild.lastElementChild.appendChild(document.createTextNode(card.emoji));

        continue;
      }

      card.domCardFace.appendChild(document.createTextNode(card.emoji));

      // card.domElement.lastElementChild.lastElementChild.appendChild(document.createTextNode(card.emoji));// ***putting emoji on the card back
      // card.domElement.lastElementChild.lastElementChild.style.fontSize = "40px";

      card.domElement.addEventListener("click", function (event) {
        if (event.target.className != "emoji-card") {
          bord.flip(bord.allCards[event.target.dataset.card]);
          bord.setShield(bord.startTimer);
        }
      });
    }
  }

  setShield(cb) {
    function changeDepth() {
      if (fullScreenBlock.style.zIndex < 0) {
        fullScreenBlock.style.zIndex = "1";
      } else {
        fullScreenBlock.style.zIndex = "-1";
      }
    }
    function reportWindowSize() {
      console.log("resize");
    }
    if (document.getElementsByClassName("fullScreenBlock").length > 0) {
      return undefined;
    }
    let notice = document.createElement("DIV");
    let fullScreenBlock = document.createElement("DIV");
    let button = document.createElement("BUTTON");
    let result = document.createElement("H3");

    fullScreenBlock.style.zIndex = -1;
    button.innerHTML = "Play again";
    button.onclick = function () {
      bord.restartGame(fullScreenBlock);
    }; /*clicking the button is restarting the game*/

    for (let i = 0; this.gameScore.length > i; i++) {
      let letter = document.createElement("span");
      letter.innerHTML = this.gameScore[i];
      letter.style.animationDelay = "0." + i + "s";
      result.appendChild(letter).classList.add("jump");
    }

    fullScreenBlock.appendChild(notice).classList.add("notice");
    document.body.appendChild(fullScreenBlock).classList.add("fullScreenBlock");
    notice.appendChild(result).classList.add("result");
    notice.appendChild(button).classList.add("restartButton");

    if (cb && typeof cb === "function") {
      cb(document.getElementsByClassName("timer")[0], changeDepth);
    } else {
      changeDepth();
    }
    window.onresize = reportWindowSize;
  }

  setTimer(containerID) {
    if (!document.getElementsByClassName("timer").length) {
      let timer = document.createElement("H3");
      let time = document.createTextNode("01:00");
      timer.appendChild(time);
      document
        .getElementById(containerID)
        .appendChild(timer)
        .classList.add("timer");
    }
  }
  startTimer(timer, cb) {
    let secondsNum = 60;
    function decreaseTime() {
      secondsNum--;
      if (secondsNum >= 10) {
        timer.innerHTML = "00:" + secondsNum;
      } else if (secondsNum >= 0) {
        timer.innerHTML = "00:0" + secondsNum;
      } else {
        clearInterval(myTimer);
        if (cb && typeof cb === "function") {
          cb();
        }
      }
    }
    window.myTimer = setInterval(function () {
      decreaseTime();
    }, 1000);
  }
  testResult() {
    let allCardsQuantity = document.getElementsByClassName("emoji-card").length;
    let flippedCardsQuantity = document.getElementsByClassName("flipped")
      .length;
    let greenCardsQuantity = document.getElementsByClassName("green").length;

    if (allCardsQuantity === greenCardsQuantity) {
      this.gameScore = "Win";

      while (document.querySelector(".result").firstChild) {
        document
          .querySelector(".result")
          .removeChild(document.querySelector(".result").firstChild);
      }

      for (let i = 0; this.gameScore.length > i; i++) {
        let letter = document.createElement("span");
        letter.innerHTML = this.gameScore[i];
        letter.style.animationDelay = "0." + i + "s";
        document
          .querySelector(".result")
          .appendChild(letter)
          .classList.add("jump");
      }

      clearInterval(myTimer);
      if (
        document.getElementsByClassName("fullScreenBlock")[0].style.zIndex < 0
      ) {
        document.getElementsByClassName("fullScreenBlock")[0].style.zIndex =
          "1";
      } else {
        document.getElementsByClassName("fullScreenBlock")[0].style.zIndex =
          "-1";
      }
    }
  }

  restartGame(shield) {
    for (
      let i = 0, cardIdList = Object.keys(this.allCards);
      i < cardIdList.length;
      i++
    ) {
      document
        .getElementById(cardIdList[i])
        .firstElementChild.classList.remove("flipped");
      document.getElementById(cardIdList[i]).classList.remove("green");
      this.greenCards = {};
      this.redCards = {};
      this.allCards[cardIdList[i]].open = false;
      this.makeWhite(this.allCards[cardIdList[i]]);
    }
    this.placeEmoji(this.allEmoojis, this.emojiContainerClass);

    this.gameScore = "Lose";

    this.close();

    document.getElementsByClassName("timer")[0].innerHTML = "01:00";
    shield.remove();
  }
}

var bord;
function setGame(bordId, emojiConClass, cardCount, cardDeck) {
  bord = new GameBord(
    bordId,
    emojiConClass,
    cardCount,
    cardDeck
  ); /*starting the game here*/
  return undefined;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
