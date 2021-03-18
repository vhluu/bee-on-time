import React, { Component } from 'react';
import './Select.css';

class Select extends Component {
  constructor(props) {
    super(props);
    const { value, options } = props;

    let label;
    let currIndex = 0;
    if (options && value) { // find value in options to get label
      options.forEach((option, index) => {
        if (option.value === value) {
          label = option.label;
          currIndex = index;
        }
      });
    }

    this.state = {
      open: false, // whether select dropdown menu is open
      currVal: value || '', // currently selected value
      currLabel: label,
      focusIndex: currIndex, // value user is currently focused on
    };

    this.toggleSelect = this.toggleSelect.bind(this);
    this.openSelect = this.openSelect.bind(this);
    this.closeSelect = this.closeSelect.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.focusNextItem = this.focusNextItem.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.dropdownRef = React.createRef(); // reference to dropdown menu
    this.setSelectRef = this.setSelectRef.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setSelectRef(node) {
    this.SelectRef = node;
  }

  /* Closes the select dropdown menu on outside click */
  handleClickOutside(event) {
    const { open } = this.state;
    if (open && this.SelectRef && !this.SelectRef.contains(event.target)) {
      this.closeSelect();
    }
  }

  /* Toggles the select dropdown menu */
  toggleSelect() {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  }

  /* Opens the select dropdown menu */
  openSelect() {
    this.setState({ open: true, });
  }

  /* Closes the select dropdown menu */
  closeSelect() {
    this.setState({ open: false, });
  }

  /* Handles when user selects an option */
  selectOption(e) {
    const { onChange } = this.props;
    const currVal = e.target.getAttribute('data-value');
    const currLabel = e.target.textContent;
    const focusIndex = e.target.getAttribute('data-index');

    if (onChange) onChange(currVal, currLabel); // pass value/label to onChange handler

    // update current value/label and close select dropdown
    this.setState({
      currVal,
      currLabel,
      focusIndex,
      open: false,
    });
  }

  /* Handles key down events in order to mimic native select behavior */
  handleKeyDown(e) {
    const SPACEBAR_KEY = 0 || 32;
    const ENTER_KEY = 13;
    const DOWN_KEY = 40;
    const UP_KEY = 38;
    const ESC_KEY = 27;

    switch (e.keyCode) {
      case SPACEBAR_KEY:
        if (!this.state.open) {
          this.openSelect();
        } else {
          this.selectItem();
          this.closeSelect();
        }
      break;
      case ENTER_KEY:
        this.selectItem();
        this.closeSelect();
        break;
      case DOWN_KEY:
        if (!this.state.open) {
          this.openSelect();
        } else {
          this.focusNextItem(0);
        }
        break;
      case UP_KEY:
        if (!this.state.open) {
          this.openSelect();
        } else {
          this.focusNextItem(1);
        }
        break;
      case ESC_KEY:
        this.closeSelect();
        break;
      default:
    }
  }

  /* Focuses on the next / prev item in the select option list */
  focusNextItem(key) {
    const { focusIndex } = this.state;
    const { options } = this.props;

    let currIndex = focusIndex;

    if (key == 1) { // UP key was pressed
      currIndex--;
      if (currIndex < 0) {
        currIndex = options.length - 1;
      }
    } else { // DOWN key was pressed
      currIndex++;
      if (currIndex == options.length) {
        currIndex = 0;
      }
    }

    this.setState({ focusIndex: currIndex });
    this.dropdownRef.current.querySelector(`[data-index="${currIndex}"]`).scrollIntoView(false); // makes sure focused item is visible
  }

  /* Handles value select on key press */
  selectItem() {
    const { focusIndex } = this.state;
    const { options } = this.props;

    this.setState({
      currVal: options[focusIndex].value,
      currLabel: options[focusIndex].label
    });
  }

  render() {
    const { open, currVal, currLabel, focusIndex } = this.state;
    const { options } = this.props;
    const selectClass = open ? 'active' : '';
    
    return (
      <div className={`select ${selectClass}`} ref={this.setSelectRef}>
        <div className="option-current" onClick={this.toggleSelect} data-value={currVal} tabIndex="0" onKeyDown={this.handleKeyDown}>{ currLabel }</div>
        <div className="options-wrapper">
          <div className="options" ref={this.dropdownRef}>
            { options.map((option, index) => <div className={`option${options[focusIndex].value == option.value ? ' selected': ''}`} key={index} data-value={option.value} data-index={index} onClick={this.selectOption} onKeyDown={this.handleKeyDown}>{ option.label }</div>) }
          </div>
        </div>
      </div>
    );
  }
}

export default Select;
