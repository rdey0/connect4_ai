import React from 'react'
import Select from './select_box.js'
const options = [
    {name: 'Monte Carlo (Medium)'},
    {name: 'Placeholder'},
    {name: 'Placeholder'}
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
                    <Select title='AI Opponent' options={options}/>
                </div>
                <div className='header-item header-button' onClick={this.props.restartGame}>
                    <div>Restart</div>
                </div>
            </header>
        );
    }
}