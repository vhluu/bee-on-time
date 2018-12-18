import React, { Component } from 'react';
import ListItem from './ListItem';
import './App.css';

class List extends Component {
  render() {
    return (
      <div>
        <ul>
          <li className="list-header">
            <div>What I need to do</div>
            <div>It'll probably take</div>
          </li>
          <ListItem/>
        </ul>
      </div>
    );
  }
}

export default List;
