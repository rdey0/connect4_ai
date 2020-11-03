import React from 'react'
import Cell from './cell.js'
export default function Column(props){
    return (
        <div className='column-container'>
            {
                props.values.map((num, row)=>{
                    return <Cell key={'' + row + ' ' + props.id} id={'' + row + ' ' + props.id} value={num}/>
                })
            }
        </div>
        
    );
}