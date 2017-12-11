import React, { Component } from 'react';

import Search from "./Search";
import TableItem from "./TableItem";

export default class Table extends Component {

  render() {

    return (
      <div className="main-table">
        <Search/>
        <ul>
          <TableItem name="hello"/>
          <TableItem name="hello"/>
        </ul>
      </div>
    );
  }
}

