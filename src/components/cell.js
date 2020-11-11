import React from 'react'
import {CELL_STATES} from '../utils/enum.js'
import player1_x from '../images/orange-x.png'
import player2_x from '../images/blue-x.png'
export default function Cell(props){
    return (
        <div>
            {props.state === CELL_STATES.EMPTY &&
                <div className='cell-container'>
                    <div className='cell empty-cell' id={props.id}>
                    </div>
                </div>
            }

            {props.state === CELL_STATES.PLAYER1 &&
                <div className='cell-container'>
                    <div className='cell player1-cell drop-token-effect' id={props.id}>
                        {props.winningMove && <img className='mark-winning-effect' alt='orange cross'src={player1_x}/>}
                    </div>
                </div>
            }

            {props.state === CELL_STATES.PLAYER2 &&
                <div className='cell-container'>
                    <div className='cell player2-cell drop-token-effect' id={props.id}>
                        {props.winningMove && <img className='mark-winning-effect' alt='blue cross' src={player2_x}/>}
                    </div>
                </div>
            }
        </div>
        
    )
}