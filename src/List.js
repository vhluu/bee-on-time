import React, { Component } from 'react';
import './App.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [{id: 1, desc: "Take a nap", hr: 0, min: 30}], // the list data
      formEvent: '', // string w/ value 'add' or 'remove' to determine user action in form
      formId: 0, // the id of the item we are currently editing in the form
      id: 1, // the last used id. to determine the next id
      startTime: '', 
      endTime: '', 
      totalHrs: 0, 
      totalMin: 0
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
    this.openForm('edit', id);
  }

  removeItem(id) {
    const data = this.state.listItems.filter(item => item.id !== id);
    this.setState({ listItems: data });
  }

  addItem() {
    this.openForm('add', 0);
  }

  openForm(type, id) {
    // add some sort of animation
    this.setState({ formEvent: type });
    this.myForm.current.style.display = "block";

    if (type == 'edit') {
      // display default values to edit
      this.setState({ formId: id });
      const currentItem = (this.state.listItems.filter(item => item.id == id));
      if (currentItem && currentItem.length > 0) {
        this.taskInput.current.value = currentItem[0].desc;
        this.hrInput.current.value = currentItem[0].hr;
        this.minInput.current.value = currentItem[0].min;
      }
    }
  }

  // submit of form
  handleSubmit(event) {
    event.preventDefault();
    const newDesc = this.taskInput.current.value;
    const newHr = this.hrInput.current.value;
    const newMin = this.minInput.current.value;

    if (this.state.formEvent == 'add') { // add new item to list
      this.setState((state, props) => ({
        listItems: (state.listItems).concat([{
          id: this.state.id + 1, 
          desc: newDesc,
          hr: newHr,
          min: newMin
        }]),
        id: this.state.id + 1
      }));
    }

    else if (this.state.formEvent == 'edit') { // edit current list item
      const currList = this.state.listItems
      for (var i = 0; i < currList.length; i++) {
        if (currList[i].id == this.state.formId) {
          currList[i] = {
            id: currList[i].id,
            desc: newDesc,
            hr: newHr,
            min: newMin
          }
          this.setState({ listItem: currList });
          break;
        }
      }

    }

    // hide and clear form
    this.myForm.current.style.display = "none";
    this.taskInput.current.value = '';
    this.hrInput.current.value = '';
    this.minInput.current.value = '';
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
              <div>
                <div className="list-item-desc">{item.desc}</div>
                <div>{item.hr}</div>
                <div>{item.min}</div>
                <div onClick={this.editItem.bind(this, item.id)}>*</div>
                <div onClick={this.removeItem.bind(this, item.id)}>X</div>
              </div>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default List;
