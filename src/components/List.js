import React, { Component } from 'react';
import Button from './Button';
import Modal from './Modal';

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
      totalMin: 0,
      showModal: false,
    }

    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addItem = this.addItem.bind(this);

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
    this.setState({ formEvent: type, showModal: true });

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
    console.log('closing form');
    // hide and clear form
    this.taskInput.current.value = '';
    this.hrInput.current.value = '';
    this.minInput.current.value = '';

    this.setState({ showModal: false });
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
      const currList = this.state.listItems;
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

  itemDragStart(e) {
    e.dataTransfer.clearData();
    e.target.style.opacity = '0.4';
    //e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', e.target.querySelector('div').getAttribute('dragId'));
  }
  itemDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    //return false;
  }
  itemDragEnter(e) {
    e.target.parentNode.style.borderBottom = '2px solid #78b3fd';
  }
  itemDragLeave(e) {
    e.target.parentNode.style.border = '0';
  }
  itemDragEnd(e) {
    e.target.style.opacity = '1';
  }
  itemDrop(e) {
    e.preventDefault();
    var currentId = e.target.parentNode.getAttribute('dragId');
    var transferId = e.dataTransfer.getData('text');
    //e.dataTransfer.clearData();
    e.target.parentNode.style.border = '0';
    if (transferId !== currentId) {
      var listClone = []; 
      this.setState(((state, props) => {
        var swap1 = state.listItems.findIndex(items => items.id == parseInt(currentId));
        var swap2 = state.listItems.findIndex(items => items.id == parseInt(transferId));
        listClone = state.listItems.map(l => Object.assign({}, l));
        var temp = listClone[swap1];
        listClone[swap1] = listClone[swap2];
        listClone[swap2] = temp;
        return { listItems: listClone};
      }));
    }
    return false;
  }

  render() {
    const { showModal } = this.state;
    return (
      <div className="list-wrapper">
        <Modal show={showModal} closeSelf={this.closeForm}>
          <form className="list-form" onSubmit={this.handleSubmit}>
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
        </Modal>
      
        <div className="list">
          <Button btnType="add" clicked={this.addItem} />
          <ul>
            <li className="list-header">
              <div>What I Need to Do</div>
              <div>Estimated Time</div>
            </li>
            {
              (this.state.listItems).map((item) => <li key={item.id} className="list-item" draggable="true" onDragStart={this.itemDragStart.bind(this)}
                onDragOver={this.itemDragOver.bind(this)} onDragEnter={this.itemDragEnter.bind(this)} onDragLeave={this.itemDragLeave.bind(this)}
                onDragEnd={this.itemDragEnd.bind(this)} onDrop={this.itemDrop.bind(this)}>
                <div dragid={item.id}>
                  <div className="list-item-desc">{item.desc}</div>
                  <div className="list-time-controls">
                    <div>
                      {item.hr > 0 && <span>{item.hr}<sup>hr&nbsp;</sup></span>}
                      {item.min > 0 && <span>{item.min}<sup>min&nbsp;</sup></span>}
                    </div>
                    <div className="list-controls">
                      <div onClick={this.editItem.bind(this, item.id)}>
                        <svg className="list-edit clickable" viewBox="0 0 15.858 13.99" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -279.61)"><g fill="#a2abff"><rect transform="rotate(-40)" x="-183.51" y="221.59" width="10.683" height="6.615" ry="0"/><rect transform="rotate(-40)" x="-174.05" y="221.59" width="3.969" height="6.615" ry="1.323"/><path d="M0 293.604l1.88-5.886 4.242 5.056z"/></g><path d="M1.024 292.73l1.374-4.692 3.485 4.152z" fill="#fffbdf"/><path d="M.77 293.104c-.08-.095.604-2.213.72-2.23.116-.015 1.638 1.798 1.602 1.91-.036.11-2.241.416-2.321.32z" fill="#a2abff"/><rect transform="rotate(-40)" x="-172.73" y="222.19" width="2.117" height="5.421" ry=".851" fill="#eccbff"/><rect transform="rotate(-40)" x="-181.39" y="222.19" width="7.039" height="5.421" ry="0" fill="#ffffb5"/><rect transform="rotate(-40)" x="-172.73" y="222.19" width=".9" height="5.421" ry="0" fill="#eccbff"/><rect transform="scale(1 -1) rotate(40)" x="-174.05" y="-227.61" width="1.023" height="5.421" ry="0" fill="#def0f6"/><g fill="#fffbdf"><path d="M4.026 287.855l-.48 1.582-1.161-1.384z"/><path d="M5.186 289.235l-.48 1.582-1.161-1.384zM6.346 290.625l-.48 1.582-1.161-1.384z"/></g><g fill="#ffffb5"><path d="M4.008 289.083l.48-1.581 1.161 1.384z"/><path d="M5.128 290.433l.48-1.581 1.161 1.384zM2.821 287.68l1.06-.89.581.693-1.64.197zM6.79 290.25l.58.693-1.06.89.48-1.583z"/></g></g></svg>
                      </div>
                      <div onClick={this.removeItem.bind(this, item.id)}>
                        <svg className="list-cancel clickable" viewBox="0 0 26.206 26.206" xmlns="http://www.w3.org/2000/svg">
                          <g transform="rotate(45 304.113 -144.83)">
                            <rect x="204.05" y="156.73" width="11.925" height="31.768" ry="5.673" fill="#a2abff" />
                            <rect x="194.13" y="166.66" width="31.768" height="11.925" ry="5.963" fill="#a2abff" />
                            <rect x="206.83" y="159.38" width="6.368" height="26.477" ry="3.089" fill="#cacaff" />
                            <rect x="196.77" y="169.43" width="26.477" height="6.368" ry="3.184" fill="#cacaff" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </li>)
            }
          </ul>
        </div>
      </div>
      
    );
  }
}

export default List;
