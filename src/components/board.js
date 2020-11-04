import React from 'react'
import Column from './column.js'
import STATES from '../utils/enum.js'
import {transpose, is_valid_move} from '../utils/helper.js'

export default class Board extends React.Component{
    constructor(props){
        super()
    }

    attempt_move=(column)=> {
        if(is_valid_move(this.props.gameState, column))
            this.props.makeMove(column);
    }

    render(){
        return (
            <div className='board-container'>
                {
                    transpose(this.props.gameState).map((column, index)=>{
                        return <Column key={index} id={index} values={column} 
                            numCols={this.props.gameState[0].length} handleUserAction={this.attempt_move}/>
                    })
                }
            </div>
        );
    }  
}