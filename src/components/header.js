import React from 'react'
import Select from './select_box.js'
import MonteCarloAi from '../classes/monte_carlo.js'
import AlphaBetaAi from '../classes/alphabeta.js'
import MinimaxAi from '../classes/minimax.js'
import OmoriAi from '../classes/omori.js'
import {CELL_STATES} from '../utils/enum.js'
const ai_timeout = 1000;
var monte_carlo = new MonteCarloAi(CELL_STATES.PLAYER2, 4, 500);
var alpha_beta = new AlphaBetaAi(CELL_STATES.PLAYER2, 4, ai_timeout, 8);
var minimax = new MinimaxAi(CELL_STATES.PLAYER2, 4, ai_timeout, 5);
var omori = new OmoriAi(CELL_STATES.PLAYER2, 4, ai_timeout);

const ai_options = [
    {name: 'Monte Carlo (Normal)', value: monte_carlo},
    {name: 'Minimax (Normal)', value: minimax},
    {name: 'Alpha-Beta (Hard)', value: alpha_beta},
    {name: 'Omori (Hard)', value: omori}
];
export default class Header extends React.Component{
    constructor(props){
        super();
    }
    render(){
        return (
            <header>
                <div id='header-title'>
                    Connect 4
                </div>
                <div className='header-item header-select'>
                    <Select title='AI Opponent' options={ai_options} handleChange={this.props.changeAi}/>
                </div>
                <div className='header-item header-button' onClick={this.props.restartGame}>
                    <div>Restart</div>
                </div>
            </header>
        );
    }
}