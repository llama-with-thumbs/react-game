import React from "react";
import GameBoard from "../game-board/game-board.component";
import InfoTable from "../info-table/info-table.component";
import "./game-wrapper.style.scss";

class GameWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      runningTime: 0,
      isGameRunning: false,
      isGamePaused: false,
      cards: [
        ["🐶", false],
        ["🐱", false],
        ["🐭", false],
        ["🐹", false],
        ["🐶", false],
        ["🐱", false],
        ["🐭", false],
        ["🐹", false],
      ],
      cardSet1: ["🦄", "🐞", "🦀", "🐟", "🐊", "🐓", "🦃", "🐭"],
      cardSet2: ["🐯", "🦁", "🐮", "🐷", "🐸", "🐙", "🐵", "🐶"],
    };
  }

  flipAllCards = () => {
    this.setState(
      {
        cards: this.state.cards.map((card, id) => [
          this.state.cardSet1[id],
          false,
        ]),
      },
      () => console.log(this.state.cards)
    );

    // this.setState({
    //   card: [this.state.cards[cardId][0], !this.state.cards[cardId][1]],
    // });
  };

  setTimer = () => {
    this.setState({ prev: !this.state.cards[0][1] }, console.log(this.state));
    this.setState((state) => {
      if (state.isGameRunning) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({ runningTime: Date.now() - startTime });
        });
      }
      return { isGameRunning: !state.isGameRunning };
    });
  };
  startTimer = () => {
    this.setState((state) => {
      if (!state.isGameRunning) {
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({ runningTime: Date.now() - startTime });
        });
        return { isGameRunning: !state.isGameRunning };
      }
    });
  };
  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, isGameRunning: false });
    this.flipAllCards();
  };

  render() {
    return (
      <div className="game-wrapper">
        <GameBoard startTimer={this.startTimer} cards={this.state.cards} />
        <InfoTable
          timer={this.state.runningTime}
          isGameRunning={this.state.isGameRunning}
          setTimer={this.setTimer}
          resetTimer={this.resetTimer}
        />
      </div>
    );
  }
}

export default GameWrapper;
