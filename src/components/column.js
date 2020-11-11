import React from 'react'
import Cell from './cell.js'

function get_col_class(col, num_cols){
    if(col === 0)
        return ' leftmost-column';
    if(col === num_cols - 1)
        return ' rightmost-column';
    return ''
}

function get_cell_class(row, col, winning_moves){
    for(var i = 0; i < winning_moves.length; ++i){
        var[curr_row, curr_col] = winning_moves[i];
        if(row === curr_row && col === curr_col)
            return true;
    }
    return false;
}
export default function Column(props){
    return (
        <div className={'column-container' + get_col_class(props.id, props.numCols)} onClick={()=>props.handleUserAction(props.id)}>
            {
                props.values.map((val, row)=>{
                    return <Cell winningMove={get_cell_class(row, props.id, props.winningMoves)} 
                        key={'' + row + ' ' + props.id} id={'' + row + ' ' + props.id} state={val}/>
                })
            }
        </div>
    );
}