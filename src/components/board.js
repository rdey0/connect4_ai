import React from 'react'
import Column from './column.js'
import {CELL_STATES} from '../utils/enum.js'
import {transpose, is_valid_move} from '../utils/helper.js'

export default class Board extends React.Component{
    constructor(props){
        super()
    }

    attempt_move=(column)=> {
        if(this.props.player === CELL_STATES.PLAYER1 && is_valid_move(this.props.board, column))
            this.props.makeMove(column);
    }

    render(){
        return (
            
            <div className='board-container'>
                {
                    transpose(this.props.board).map((column, index)=>{
                        return <Column key={index} id={index} values={column} 
                            numCols={this.props.board[0].length} handleUserAction={this.attempt_move} 
                            winningMoves={this.props.winningMoves}/>
                    })
                }
            </div>
            
        );
    }  
}