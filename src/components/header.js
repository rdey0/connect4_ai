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
                    Difficulty
                </div>
                <div className='header-item' onClick={this.props.restartGame}>
                    Restart
                </div>
            </header>
        );
    }
}