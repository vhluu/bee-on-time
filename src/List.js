import React, { Component } from 'react';
import './App.css';

class List extends Component {
  // function to add item -> create ListItem
  // function to edit item 
  // function to remove item
  constructor(props) {
    super(props);
    this.state = {
      listItems: [{id: 1, desc: "Take a nap"}]
    }
    this.editItem = this.editItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  editItem() {
    console.log('editing');
  }

  removeItem(id) {
    const data = this.state.listItems.filter(item => item.id !== id);
    this.setState({ listItems: data });
  }

  addItem() {
    // show form
    // on form submit, add an item
    this.setState((state, props) => ({
      listItems: (state.listItems).concat([{id: 2, desc: "Eat pie"}])
    }));
  }

  render() {
    return (
      <div className="list">
        <div className="add-btn" onClick={this.addItem.bind(this)}>+</div>
        <ul>
          <li className="list-header">
            <div>What I Need to Do</div>
            <div>Estimated Time</div>
          </li>
          {
            (this.state.listItems).map((item) => <li key={item.id} className="list-item">
              {item.desc}
              <div onClick={this.editItem.bind(this, item.id)}>Edit</div>
              <div onClick={this.removeItem.bind(this, item.id)}>Remove</div>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default List;
