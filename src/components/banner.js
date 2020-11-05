import React from 'react'
import {GAME_STATES} from '../utils/enum.js'
import Confetti from 'react-dom-confetti';

const config = {
  angle: "25",
  spread: 320,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.21,
  duration: 2500,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "1000px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

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
            <Confetti active={ props.gameState === GAME_STATES.WIN} config={ config }/>
            <BannerContent gameState={props.gameState} player={props.player}/>
        </div>
    )
}