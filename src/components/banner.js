import React from 'react'
import {CELL_STATES, GAME_STATES} from '../utils/enum.js'
import Confetti from 'react-dom-confetti';

const config = {
  angle: "360",
  spread: 340,
  startVelocity: 35,
  elementCount: 100,
  dragFriction: 0.23,
  duration: 2200,
  stagger: 10,
  width: "10px",
  height: "10px",
  perspective: "1000px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

function BannerContent(props){
    switch(props.gameState){
        case GAME_STATES.WIN:
            if(props.player === CELL_STATES.PLAYER1)
                return(<div className='message banner-win-effect'>{props.message}</div>);
            else
                return(<div className='message-ai banner-ai-win-effect'> {props.message}</div>);
        case GAME_STATES.DRAW:
            return(<div className='message banner-draw-effect'>{props.message}</div>);
        default:
            return (null);
    }
}

export default function Banner(props){
    return(
        <div className='banner-container'>
            <Confetti active={ props.gameState === GAME_STATES.WIN && props.player === CELL_STATES.PLAYER1} config={ config }/>
            <BannerContent gameState={props.gameState} player={props.player} message={props.message}/>
        </div>
    )
}