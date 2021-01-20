import React, { Component } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';
import './List.css';

class List extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      listItems: [], // the list data (ex. [{id: 1, desc: "Take a nap", hr: 0, min: 30}])
      formEvent: '', // string w/ value 'add' or 'remove' to determine user action in form
      itemId: -1, // the id of the item we are currently editing in the form
      id: 1, // the last used id. to determine the next id
      startTime: '', 
      endTime: '', 
      totalHrs: 0, 
      totalMin: 0,
      showModal: false,
      prefillForm: false, // whether task form fields should be prefilled
      taskVal: '', // current task input field value
      hrVal: '', // current hr input field value
      minVal: '' // current min input field value
    }

    this.openForm = this.openForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addItem = this.addItem.bind(this);

    this.formRef = React.createRef();
  }

  /* Opens task form in 'edit' mode, passing id of the list item */
  editItem(id) {
    this.openForm('edit', id);
  }

  /* Opens task form in 'add' mode */
  addItem() {
    this.openForm('add');
  }

  /* Removes item from list */
  removeItem(id) {
    let oldTime = {};
    this.setState((state) => ({
      listItems: state.listItems.filter(item => {
        if (item.id == id) {
          oldTime = { hr: item.hr, min: item.min };
        }
        return item.id !== id;
      })
    }), () => {
      // this.props.updateList(this.state.listItems);
      this.props.updateTime(null, oldTime)
    })
  }

  /* Opens the task form (should be prefilled if editing list entry) */
  openForm(type, id) {
    let updatedState = {
      formEvent: type,
      showModal: true
    };

    if (type === 'edit') { // get values of current item to prefill form with
      const currentItem = this.state.listItems.filter(item => item.id === id);
      if (currentItem && currentItem.length > 0) {
        updatedState = {
          ...updatedState,
          itemId: id,
          taskVal: currentItem[0].task,
          hrVal: currentItem[0].hr,
          minVal: currentItem[0].min,
          prefillForm: true
        };
      }
    }

    this.setState(updatedState);
  }

  /* Closes modal and clears form fields */
  closeModal() {
    this.setState({
      showModal: false,
      prefillForm: false,
    });

    this.formRef.current.resetForm();
  }

  /* Handles form submit */
  handleSubmit(formData) {
    const { task, hr, min } = formData;
    const { formEvent, listItems, itemId } = this.state;

    if (formEvent === 'add') { // add new item to list
      this.setState(((state) => ({
        listItems: (state.listItems).concat([{ id: this.state.id + 1,  task, hr, min }]),
        id: this.state.id + 1
      })), () => { // callback function
        this.props.updateTime({ hr, min });
      });
    } else if (formEvent === 'edit') { // edit current list item
      const currList = listItems;
      for (var i = 0; i < currList.length; i++) {
        if (currList[i].id === itemId) {
          const oldTime = { 
            hr: currList[i].hr, 
            min: currList[i].min
          };
          currList[i] = { id: currList[i].id, task, hr, min};

          this.setState({ listItem: currList }, () => { 
            this.props.updateTime({ hr, min }, oldTime);
          });
          break;
        }
      }
    }
    
    this.closeModal(); // close modal and clear form
  }

  /* Handles Drag / Drop events */
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
    const { showModal, taskVal, hrVal, minVal, prefillForm } = this.state;
    
    return (
      <div className="list-wrapper">
        <Modal show={showModal} closeSelf={this.closeModal}>
          <TaskForm submit={this.handleSubmit} ref={this.formRef} defaultTask={taskVal} defaultHr={hrVal} defaultMin={minVal} prefill={prefillForm} />
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
                  <div className="list-item-desc">{item.task}</div>
                  <div className="list-time-controls">
                    <div>
                      {item.hr > 0 && <span>{item.hr}<sup>hr&nbsp;</sup></span>}
                      {item.min > 0 && <span>{item.min}<sup>min&nbsp;</sup></span>}
                    </div>
                    <div className="list-controls">
                      <Button btnType="edit" clicked={this.editItem.bind(this, item.id)} />
                      <Button btnType="delete" clicked={this.removeItem.bind(this, item.id)} />
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
