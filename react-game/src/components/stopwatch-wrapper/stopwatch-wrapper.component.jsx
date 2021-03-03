// src/App.js
import React, { useState } from "react";
import "./stopwatch-wrapper.styles.scss";

const StopwatchWrapper = (props) => {
  const gameStatus = props.isGameRunning;
  return (
    <div className="stopwatch">
      <p className="game-time">{Math.round(props.timer/600)} sec</p>
      <button onClick={props.setTimer}>{gameStatus ? 'Pause' : 'Start'}</button>
      <button onClick={props.resetTimer}>Restart</button>
    </div>
  );
};

// class StopwatchWrapper extends React.Component {
//   constructor(props) {
//     super();
//     this.state = {
//       status: false,
//       runningTime: 0,
//     };
//     console.log(props);
//   }

// handleClick = () => {
//   this.setState((state) => {
//     if (state.status) {
//       clearInterval(this.timer);
//     } else {
//       const startTime = Date.now() - this.state.runningTime;
//       this.timer = setInterval(() => {
//         this.setState({ runningTime: Date.now() - startTime });
//       });
//     }
//     return { status: !state.status };
//   });
// };
// componentWillUnmount() {
//   clearInterval(this.timer);
// }

//   handleReset = () => {
//     clearInterval(this.timer);
//     this.setState({ runningTime: 0, status: false });
//   };
//   render() {
//     const { status, runningTime } = this.state;
//     return (
//       <div>
//         <p>{runningTime}ms</p>
//         <button onClick={this.handleClick}>{status ? "Stop" : "Start"}</button>
//         <button onClick={this.handleReset}>Reset</button>
//       </div>
//     );
//   }
// }

export default StopwatchWrapper;
