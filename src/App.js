import './App.css';
import React from 'react';
import Header from './components/header.js'
import Board from './components/board.js'
import Banner from './components/banner.js'
import {CELL_STATES, GAME_STATES} from './utils/enum.js'
import {get_game_state, get_winning_move, make_copy, wait} from './utils/helper.js'
import MonteCarloAi from './classes/monte_carlo.js'

const config = {
  initial_num_rows: 6,
  initial_num_cols: 7,
  initial_num_to_win: 4,
  ai_turn_delay: 100,
  ai_timeout: 1000
}

class App extends React.Component{
  state = {
    num_rows: config.initial_num_rows,
    num_cols: config.initial_num_cols,
    board: new Array(config.initial_num_rows).fill(CELL_STATES.EMPTY).map(()=> 
      new Array(config.initial_num_cols).fill(CELL_STATES.EMPTY)),
    winning_moves: [],
    first_player: CELL_STATES.PLAYER1,
    curr_player: CELL_STATES.PLAYER1,
    ai: new MonteCarloAi(CELL_STATES.PLAYER2, 4, 500),
    ai_name: 'Monte Carlo',
    num_to_win: config.initial_num_to_win,
    game_state: GAME_STATES.ONGOING,
    message:''
  };

  componentDidUpdate() {
    if(this.state.curr_player === CELL_STATES.PLAYER2 && this.state.game_state === GAME_STATES.ONGOING){
      this.get_ai_move();
    }
  }

  async get_ai_move() {
    await wait(config.ai_turn_delay);
    var next_move = this.state.ai.get_next_move(make_copy(this.state.board));
    this.make_move(next_move);
    
  }

  restart_game=()=> {
    var first_player = (this.state.first_player === CELL_STATES.PLAYER1) ? 
      CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;

    this.setState({
      board: new Array(6).fill(0).map(()=> new Array(7).fill(0)),
      first_player: first_player,
      curr_player: first_player,
      game_state: GAME_STATES.ONGOING,
      winning_moves: []
    });
  }

  make_move=(column)=>{
    if(this.state.game_state !== GAME_STATES.ONGOING) 
      return;
    var board = this.state.board;
    var row = 0;
    while(row < this.state.num_rows && board[row][column] === CELL_STATES.EMPTY) row++;
    board[row - 1][column] = this.state.curr_player;
    var curr_game_state = get_game_state(board, row-1, column, this.state.num_to_win, this.state.curr_player);
    this.update_game_state(curr_game_state, board, row-1, column);
  }

  update_game_state=(curr_game_state, board, row, col)=> {
    // switch to the next player if game hasn't ended
    if(curr_game_state === GAME_STATES.ONGOING){
      var next_player = (this.state.curr_player === CELL_STATES.PLAYER1) ? 
        CELL_STATES.PLAYER2 : CELL_STATES.PLAYER1;
      this.setState({board: board, game_state: curr_game_state, curr_player: next_player});
    }else{
      var winning_moves = [];
      // assume someone has won or there was a draw
      if(curr_game_state === GAME_STATES.WIN){
        //get the winning moves and mark them on the board
        winning_moves = get_winning_move(board, row, col, this.state.num_to_win, this.state.curr_player);
      }

      this.setState({
        board: board, 
        game_state: curr_game_state, 
        winning_moves: winning_moves,
        message: this.set_banner_message(curr_game_state)
      });
    }
  }

  set_banner_message=(game_state)=>{
    switch(game_state){
      case GAME_STATES.WIN:
          if(this.state.curr_player === CELL_STATES.PLAYER1)
              return 'You Win!';
          else{
            return `${this.state.ai_name} Wins!`;
          }
      case GAME_STATES.DRAW:
          return 'Draw';
      default:
          return '';
    }
  }

  set_ai=(new_ai)=> {
    var ai_object = new_ai.value;
    var ai_name = new_ai.name.split(' ');
    ai_name.pop();
    ai_name = ai_name.join(' ');

    this.setState({ai: ai_object, ai_name: ai_name}, ()=>{
    });
  }

  render(){ 
    return (
      <div className="App">
        <Header restartGame={this.restart_game} changeAi={this.set_ai}/>
        <Banner gameState={this.state.game_state} player={this.state.curr_player} message={this.state.message}/>
        <Board board={this.state.board} makeMove={this.make_move} 
          winningMoves={this.state.winning_moves} player={this.state.curr_player}/>
      </div>
    );
  }
}

export default App;
