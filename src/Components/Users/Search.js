import React, { Component } from 'react';
import PropTypes from 'prop-types'


export class Search extends Component {
    state={
        text: ""
    }

    static propTypes ={
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }
    
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
        
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.text === ""){
            this.props.setAlert("Please enter something", "light")
        } else {
            console.log("Adasd")
            
            this.props.searchUsers(this.state.text);
            this.setState({text: ""})  
        }
    }
    
    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" value={this.state.text} placeholder="Search Users..." onChange={this.changeHandler} />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {this.props.showClear && 
                <button className="btn btn-light btn-block" onClick={this.props.clearUsers}>Clear</button>}
            </div>
        )
    }
}

export default Search
