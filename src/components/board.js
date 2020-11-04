import React from 'react'
import Column from './column.js'
import STATES from '../utils/enum.js'

function transpose(matrix){
    console.log(matrix);
    return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

function is_valid_move(matrix, column){
    return matrix[0][column] === STATES.EMPTY;
}

function test (){
    console.log('test');
}

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
                        return <Column key={index} id={index} values={column} handleUserAction={this.attempt_move}/>
                    })
                }
            </div>
        );
    }  
}