import React from 'react'
import Column from './column.js'

function transpose(matrix){
    console.log(matrix);
    return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

export default function Board(props){
    return (
        <div className='board-container'>
            {
                transpose(props.gameState).map((column, index)=>{
                    return <Column key={index} id={index} values={column}/>
                })
            }
        </div>
    );
}