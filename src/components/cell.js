import React from 'react'
import {CELL_STATES} from '../utils/enum.js'

export default function Cell(props){
    return (
        <div>
            {props.state === CELL_STATES.EMPTY &&
                <div className='cell empty-cell' id={props.id}>
                    {props.state}
                </div>
            }

            {props.state === CELL_STATES.PLAYER1 &&
                <div className='cell player1-cell' id={props.id}>
                    {props.state}
                </div>
            }

            {props.state === CELL_STATES.PLAYER2 &&
                <div className='cell player2-cell' id={props.id}>
                    {props.state}
                </div>
            }
        </div>
        
    )
}