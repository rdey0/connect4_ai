import React from 'react'
import {GAME_STATES} from '../utils/enum.js'
import Confetti from 'react-dom-confetti';

const config = {
  angle: "360",
  spread: 340,
  startVelocity: 35,
  elementCount: 100,
  dragFriction: 0.22,
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
            return(<div className='message banner-win-effect'> Player {props.player} Wins!</div>);
        case GAME_STATES.DRAW:
            return(<div className='message banner-draw-effect'> Draw </div>);
        default:
            return (null);
    }
}

export default function Banner(props){
    return(
        <div className='banner-container'>
            <Confetti active={ props.gameState === GAME_STATES.WIN} config={ config }/>
            <BannerContent gameState={props.gameState} player={props.player}/>
        </div>
    )
}