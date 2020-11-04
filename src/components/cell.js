import React from 'react'

export default function Cell(props){
    return (
        <div className='cell-container' id={props.id}>
            {props.value}
        </div>
    )
}