import React from 'react'
import {GAME_STATES} from '../utils/enum.js'
// current player
// game_over
function BannerContent(props){
    switch(props.gameState){
        case GAME_STATES.WIN:
            return(<div className='message'> Player {props.player} Wins!</div>);
        case GAME_STATES.DRAW:
            return(<div className='message'> Draw </div>);
        default:
            return (null);
    }
}

export default function Banner(props){
    return(
        <div className='banner-container'>
            <BannerContent gameState={props.gameState} player={props.player}/>
        </div>
    )
}