import React from 'react'
import Cell from './cell.js'

function get_class(col, num_cols){
    if(col === 0)
        return ' leftmost-column';
    if(col === num_cols - 1)
        return ' rightmost-column';
    return ''
}
export default function Column(props){
    return (
        <div className={'column-container' + get_class(props.id, props.numCols)} onClick={()=>props.handleUserAction(props.id)}>
            {
                props.values.map((val, row)=>{
                    return <Cell key={'' + row + ' ' + props.id} id={'' + row + ' ' + props.id} state={val}/>
                })
            }
        </div>
    );
}