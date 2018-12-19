import React, { Component } from 'react';
import './App.css';

class List extends Component {
  // function to add item -> create ListItem
  // function to edit item 
  // function to remove item
  constructor(props) {
    super(props);
    this.state = {
      listItems: [{id: 1, desc: "Take a nap"}],
      task: '',
      hr: 0, 
      min: 0,
      formEvent : '',
      id: 0
    }
    this.editItem = this.editItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.openForm = this.openForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.myForm = React.createRef();
  }

  editItem(id) {
    console.log('editing');
    this.openForm('edit', id);
  }

  removeItem(id) {
    const data = this.state.listItems.filter(item => item.id !== id);
    this.setState({ listItems: data });
  }

  addItem() {
    // show form
    // on form submit, add an item
    // this.setState((state, props) => ({
    //   listItems: (state.listItems).concat([{id: 2, desc: "Eat pie"}])
    // }));
    this.openForm('add', 0);
  }

  openForm(type, id) {
    // add some sort of animation
    this.setState({ formEvent: type });
    this.myForm.current.style.display = "block";

    if (type == 'add') {
      
    }

    else if (type == 'edit') {
      // retrieve the list item's 

    }
  }

  handleSubmit(event) {
    // so we have this.state.hrs, .min. and .task
    // we need to determine if this is an edit or add
    // we need to reset the values to their defaults
    event.preventDefault();
    this.myForm.current.style.display = "none";

    if (this.state.formEvent == 'add') {
      this.setState((state, props) => ({
        listItems: (state.listItems).concat([{
          id: this.state.id + 1, 
          desc: this.state.task
        }])
      }));
    }

    else if (this.state.formEvent == 'edit') {

    }
  }

  render() {
    return (
      <div className="list">
        <form className="list-form" ref={this.myForm} onSubmit={this.handleSubmit}>
          <label for="task">What do you need to do?</label>
          <input type="text" name="task" value={this.state.task}/>
          <label for="task">How long will it take?</label>
          <input type="number" name="estimated-hrs" value={this.state.hrs}/>
          <input type="number" name="estimated-min" value={this.state.min}/>
          <input type="submit" value="Submit"></input>
        </form>
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
