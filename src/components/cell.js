import React from 'react'
import STATES from '../utils/enum.js'

export default function Cell(props){
    return (
        <div>
            {props.state === STATES.EMPTY &&
                <div className='cell empty-cell' id={props.id}>
                    {props.state}
                </div>
            }

            {props.state === STATES.PLAYER1 &&
                <div className='cell player1-cell' id={props.id}>
                    {props.state}
                </div>
            }

            {props.state === STATES.PLAYER2 &&
                <div className='cell player2-cell' id={props.id}>
                    {props.state}
                </div>
            }
        </div>
        
    )
}