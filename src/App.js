import './App.css';
import React from 'react';
import Header from './components/header.js'
import Board from './components/board.js'
import STATES from './utils/enum.js'
import {is_game_over} from './utils/helper.js'

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

  componentDidUpdate() {
    if(this.state.curr_player === STATES.PLAYER2){
      console.log('AI TURN');
    }
  }

  restart_game=()=> {
    this.setState({
      game_state: new Array(6).fill(0).map(()=> new Array(7).fill(0)),
      curr_player: STATES.PLAYER1,
      game_over: false
    });
  }

  make_move=(column)=>{
    var board = this.state.game_state;
    var row = 0;
    while(row < this.state.num_rows && board[row][column] === STATES.EMPTY)
      row++;
    board[row - 1][column] = this.state.curr_player;
    if(is_game_over(board, row-1, column, this.state.num_to_win, this.state.curr_player)){
      this.setState({game_state: board, game_over: true}, ()=>{
        console.log('state: ', this.state);
      });
    }else{
      var next_player = (this.state.curr_player === STATES.PLAYER1) ? STATES.PLAYER2 : STATES.PLAYER1;
      this.setState({game_state: board, curr_player: next_player}, ()=>{
        console.log('state: ', this.state);
      })
    }
  }

  render(){ 
    return (
      <div className="App">
        <Header restartGame={this.restart_game}/>
        <Board gameState={this.state.game_state} makeMove={this.make_move}/>
        {this.state.game_over &&
          <div>Player {this.state.curr_player} Wins</div>
        }
      </div>
    );
  }
}

export default App;
