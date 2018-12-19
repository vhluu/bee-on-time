import React, { Component } from 'react';
import './App.css';

class List extends Component {
  // function to add item -> create ListItem
  // function to edit item 
  // function to remove item
  constructor(props) {
    super(props);
    this.state = {
      listItems: [{id: 1, desc: "Take a nap", hr: 0, min: 30}],
      formEvent : '',
      id: 1
    }
    this.editItem = this.editItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.openForm = this.openForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.myForm = React.createRef();
    this.taskInput = React.createRef();
    this.hrInput = React.createRef();
    this.minInput = React.createRef();
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

    if (type == 'edit') {
      // display default values to edit

    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.formEvent == 'add') {
      this.setState((state, props) => ({
        listItems: (state.listItems).concat([{
          id: this.state.id + 1, 
          desc: this.taskInput.current.value,
          hr: this.hrInput.current.value,
          min: this.minInput.current.value
        }]),
        id: this.state.id + 1
      }));
    }

    else if (this.state.formEvent == 'edit') {

    }

    this.myForm.current.style.display = "none";
  }

  render() {
    return (
      <div className="list">
        <form className="list-form" ref={this.myForm} onSubmit={this.handleSubmit}>
          <label for="task">What do you need to do?</label>
          <input type="text" name="task" ref={this.taskInput}/>
          <label for="task">How long will it take?</label>
          <input type="number" name="estimated-hrs" ref={this.hrInput}/>
          <input type="number" name="estimated-min" ref={this.minInput}/>
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
              {item.hr} 
              {item.min}
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
