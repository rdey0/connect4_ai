import React from 'react'
import Cell from './cell.js'
export default function Column(props){
    return (
        <div className='column-container' onClick={()=>props.handleUserAction(props.id)}>
            {
                props.values.map((val, row)=>{
                    return <Cell key={'' + row + ' ' + props.id} id={'' + row + ' ' + props.id} value={val}/>
                })
            }
        </div>
        
    );
}