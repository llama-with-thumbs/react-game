import React from "react";
import "./game-board.styles.scss";
import Card from "../card/card.component";

const GameBoard = (props) => (
  <div className="game-board">
    {props.cards.map((card, id) => (
      <Card key={card+id} card={card} cardId={id} {...props} />
    ))}
  </div>
);

export default GameBoard;
