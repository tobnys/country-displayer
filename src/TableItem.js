import React, { Component } from 'react';

export default class TableItem extends Component {
  
  render() {

    return (
        <li>Name: {this.props.name} | Capital: | Population: | Currency: </li>
    );
  }
}
