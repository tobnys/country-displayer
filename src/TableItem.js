import React, { Component } from 'react';

export default class TableItem extends Component {
  
  render() {

    return (
        <li>Name: {this.props.name} | Capital: {this.props.capital} | Population: {this.props.population} | Currency: {this.props.currency} | Conversion: {this.props.conversion}</li>
    );
  }
}
