import './App.css';
import React from 'react';
import Header from './components/header.js'
import Board from './components/board.js'
import Banner from './components/banner.js'
import {CELL_STATES, GAME_STATES} from './utils/enum.js'
import {get_game_state} from './utils/helper.js'
import Confetti from 'react-dom-confetti';

const config = {
  angle: "25",
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

class App extends React.Component{
  state = {
    num_rows: 6,
    num_cols: 7,
    board: new Array(6).fill(CELL_STATES.EMPTY).map(()=> new Array(7).fill(CELL_STATES.EMPTY)),
    curr_player: CELL_STATES.PLAYER1,
    ai: null,
    num_to_win: 4,
    game_state: GAME_STATES.ONGOING,
    game_over: false
  };

  componentDidUpdate() {
    if(this.state.curr_player === CELL_STATES.PLAYER2){
    }
  }

  restart_game=()=> {
    this.setState({
      board: new Array(6).fill(0).map(()=> new Array(7).fill(0)),
      curr_player: CELL_STATES.PLAYER1,
      game_state: GAME_STATES.ONGOING,
      game_over: false
    });
  }

  make_move=(column)=>{
    var board = this.state.board;
    var row = 0;
    while(row < this.state.num_rows && board[row][column] === CELL_STATES.EMPTY) row++;
    board[row - 1][column] = this.state.curr_player;
    var curr_game_state = get_game_state(board, row-1, column, this.state.num_to_win, this.state.curr_player);
    console.log('Player ' + this.state.curr_player + ' ' + curr_game_state);
    this.setState({board: board, game_state: curr_game_state});
    if(curr_game_state === GAME_STATES.ONGOING){
      var next_player = (this.state.curr_player === CELL_STATES.PLAYER1) ? 
        CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;
      this.setState({curr_player: next_player});
    }
  }

  render(){ 
    return (
      <div className="App">
        <Header restartGame={this.restart_game}/>
        <Banner gameState={this.state.game_state} player={this.state.curr_player}/>
        <Board board={this.state.board} makeMove={this.make_move}/>
      </div>
    );
  }
}

export default App;
