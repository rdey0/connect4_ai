import './App.css';
import React from 'react';
import Header from './components/header.js'
import Board from './components/board.js'
import STATES from './utils/enum.js'


class App extends React.Component{
  state = {
    num_rows: 6,
    num_cols: 7,
    game_state: new Array(6).fill(STATES.EMPTY).map(()=> new Array(7).fill(STATES.EMPTY)),
    curr_player: STATES.PLAYER1,
    ai: null,
    num_to_win: 4,
    game_over: false
  };

  restart_game=()=> {
    this.setState({
      game_state: new Array(6).fill(0).map(()=> new Array(7).fill(0)),
      is_player1_turn: true
    });
  }

  is_game_over=(row, col)=> {
    const num_rows = this.state.num_rows;
    const num_cols = this.state.num_cols;
    const num_to_win = this.state.num_to_win;
    var num_consecutive = 1;
    //check top left diagonal
    for(var i = 1; row - i >= 0 && col - i >= 0; i++){
      num_consecutive += 1
      //if(num_consecutive)
    } 
  }

  make_move=(column)=>{
    var board = this.state.game_state;
    var row = 0;
    while(row < this.state.num_rows && board[row][column] === STATES.EMPTY)
      row++;
    board[row - 1][column] = this.state.curr_player;
    var next_player = (this.state.curr_player === STATES.PLAYER1) ? STATES.PLAYER2 : STATES.PLAYER1;
    this.setState({game_state: board, curr_player: next_player});
  }

  render(){ 
    return (
      <div className="App">
        <Header restartGame={this.restart_game}/>
        <Board gameState={this.state.game_state} makeMove={this.make_move}/>
      </div>
    );
  }
}

export default App;
