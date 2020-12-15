import React from 'react';
import onClickOutside from 'react-onclickoutside';
class Select extends React.Component{
    
    constructor(props){
        super();
        this.state = {
            selected_option: 1,
            show_options: false
        }
    }

    //Close options menu if a click outside the select box is detected
    handleClickOutside = () => {
        if(this.state.show_options)
            this.setState({show_options: false});
    }

    //Show menu options
    toggle_show_options=()=> {
        var show = !this.state.show_options;
        this.setState({show_options: show});
    }

    //Change the selected menu option
    select_option=(index)=> {
        this.setState({selected_option: index});
        this.props.handleChange(this.props.options[index]);
        this.toggle_show_options();
    }

    //Determin if an option is the currently selected option
    is_selected=(index)=> {
        return(index === this.state.selected_option)
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

export default onClickOutside(Select);