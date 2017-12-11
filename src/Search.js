import React, { Component } from 'react';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = ({
            searchValue: "",
        })
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFormChange(e){
        this.setState({
            searchValue: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.searchValue)
    }

  
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <label>
                Search: <input type="text" name="search" value={this.state.searchValue} onChange={this.handleFormChange}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    );
  }
}
