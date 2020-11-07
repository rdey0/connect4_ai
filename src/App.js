import './App.css';
import React from 'react';
import Header from './components/header.js'
import Board from './components/board.js'
import Banner from './components/banner.js'
import {CELL_STATES, GAME_STATES} from './utils/enum.js'
import {get_game_state} from './utils/helper.js'
import MonteCarloAi from './classes/monte_carlo.js'
var monte_carlo = new MonteCarloAi(CELL_STATES.PLAYER2, 4, 500);
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

  get_ai_move() {
    var copy = [];
      for (var i = 0; i < this.state.board.length; i++)
          copy[i] = this.state.board[i].slice();
    var next_move = monte_carlo.get_next_move(copy);
    this.make_move(next_move);
    
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
    console.log(board);
    console.log('row',row);
    board[row - 1][column] = this.state.curr_player;
    var curr_game_state = get_game_state(board, row-1, column, this.state.num_to_win, this.state.curr_player);
    //console.log('Player ' + this.state.curr_player + ' ' + curr_game_state);
    
    if(curr_game_state === GAME_STATES.ONGOING){
      var next_player = (this.state.curr_player === CELL_STATES.PLAYER1) ? 
        CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;
      this.setState({board: board, game_state: curr_game_state, curr_player: next_player}, ()=>{
        console.log(this.state.board);
        if(this.state.curr_player === CELL_STATES.PLAYER2){
          this.get_ai_move();
          //setTimeout(this.get_ai_move, 1000);
        } 
      });
    }else{
      this.setState({board: board, game_state: curr_game_state});
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
