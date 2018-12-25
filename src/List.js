import React, { Component } from 'react';
import './App.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // listItems: [{id: 1, desc: "Take a nap", hr: 0, min: 30}],
      listItems: [], // the list data
      formEvent: '', // string w/ value 'add' or 'remove' to determine user action in form
      formId: 0, // the id of the item we are currently editing in the form
      id: 1, // the last used id. to determine the next id
      startTime: '', 
      endTime: '', 
      totalHrs: 0, 
      totalMin: 0
    }

    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
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
    this.setState((state, props) => ({
      listItems: state.listItems.filter(item => item.id !== id)
    }), () => {
      console.log(this.state.listItem); this.props.updateList(this.state.listItems);
    })
  }

  addItem() {
    this.openForm('add', 0);
  }

  openForm(type, id) {
    // add some sort of animation
    this.setState({ formEvent: type });
    this.myForm.current.style.display = "flex";

    if (type === 'edit') {
      // display default values to edit
      this.setState({ formId: id });
      const currentItem = (this.state.listItems.filter(item => item.id === id));
      if (currentItem && currentItem.length > 0) {
        this.taskInput.current.value = currentItem[0].desc;
        this.hrInput.current.value = currentItem[0].hr;
        this.minInput.current.value = currentItem[0].min;
      }
    }
  }

  closeForm() {
    // hide and clear form
    this.myForm.current.style.display = "none";
    this.taskInput.current.value = '';
    this.hrInput.current.value = '';
    this.minInput.current.value = '';
  }

  // submit of form
  handleSubmit(event) {
    event.preventDefault();
    const newDesc = this.taskInput.current.value;
    const newHr = parseInt(this.hrInput.current.value);
    const newMin = parseInt(this.minInput.current.value);

    if (this.state.formEvent === 'add') { // add new item to list
      this.setState(((state, props) => ({
        listItems: (state.listItems).concat([{
          id: this.state.id + 1, 
          desc: newDesc,
          hr: newHr,
          min: newMin
        }]),
        id: this.state.id + 1
      })), () => { // callback function
        this.props.updateList(this.state.listItems);
      });
      
    }

    else if (this.state.formEvent === 'edit') { // edit current list item
      const currList = this.state.listItems
      for (var i = 0; i < currList.length; i++) {
        if (currList[i].id === this.state.formId) {
          currList[i] = {
            id: currList[i].id,
            desc: newDesc,
            hr: newHr,
            min: newMin
          }
          this.setState({ listItem: currList }, () => { this.props.updateList(currList) });
          break;
        }
      }

    }

    // hide and clear form
    this.closeForm();
  }

  render() {
    return (
      <div className="list">
        <form className="list-form" ref={this.myForm} onSubmit={this.handleSubmit}>
          <div className="clickable add-btn" onClick={this.closeForm}>x</div>
          <h3>Add a new task</h3>
          <label htmlFor="task">What do you need to do?</label>
          <input type="text" name="task" ref={this.taskInput} required maxLength="50" placeholder="Pack lunch"/>
          <label>How long will it take?</label>
          <div>
            <input type="number" name="estimated-hrs" ref={this.hrInput} required min="0" placeholder="0"/> 
            <span>hr(s)</span>
            <input type="number" id="estimated-min" name="estimated-min" required min="0" ref={this.minInput} placeholder="0"/>
            <span>mins</span>
          </div>
          <input type="submit" className="clickable" value="Submit"></input>
        </form>
        <div className="add-btn clickable" onClick={this.addItem.bind(this)}>+</div>
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
                <div onClick={this.removeItem.bind(this, item.id)}>Cancel</div>
              </div>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default List;
