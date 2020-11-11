import React from 'react';

export default class Select extends React.Component{
    constructor(props){
        super();
        this.state = {
            selected_option: 0,
            show_options: false
        }
    }

    toggle_show_options=()=> {
        var show = !this.state.show_options;
        this.setState({show_options: show});
    }

    select_option=(index)=> {
        this.setState({selected_option: index});
        this.props.handleChange(this.props.options[index]);
        this.toggle_show_options();
    }

    is_selected=(index)=> {
        return(index == this.state.selected_option)
    }
    render() {
        return (
            <div className='select-box-container' onClick={this.toggle_show_options}>
                <div className='select-title'>{this.props.title}</div>
                {this.state.show_options &&
                    <div className='select-options' onBlur={this.toggle_show_options}>
                        {
                            this.props.options.map((option, index) =>{
                                if(this.is_selected(index)){
                                    return <div className='option-selected' onClick={()=>this.select_option(index)} 
                                        key={index}>{option.name}</div>
                                }else{
                                    return <div className='option' onClick={()=>this.select_option(index)} 
                                        key={index}>{option.name}</div>
                                }
                                
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}