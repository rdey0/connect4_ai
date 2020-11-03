import './App.css';
import React from 'react';
import Header from './components/header.js'
import Board from './components/board.js'
class App extends React.Component{
  state = {
    num_rows: 6,
    num_cols: 7,
    board: new Array(6).fill(0).map(()=> new Array(7).fill(0)),
    is_player_turn: true,
    ai: null
  };

  restart_game=()=> {
    this.setState({
      board: new Array(6).fill(0).map(()=> new Array(7).fill(0)),
      is_player_turn: true
    });
  }

  render(){ 
    return (
      <div className="App">
        <Header restartGame={this.restart_game}/>
        <Board/>
      </div>
    );
  }
}

export default App;
