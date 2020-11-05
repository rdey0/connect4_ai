import React from 'react'

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
                <div className='header-item'>
                    <div>Difficulty</div>
                </div>
                <div className='header-item header-button' onClick={this.props.restartGame}>
                    <div>Restart</div>
                </div>
            </header>
        );
    }
}