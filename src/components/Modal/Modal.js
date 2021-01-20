import React, { Component } from 'react';
import Button from '../Button/Button';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevFocusElement: ''
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    const { show, children } = this.props;
    
    // focus on modal content on show
    if (show && !prevProps.show) {
      this.setState({ prevFocusElement: document.activeElement });
      
      if (children) { // focus on first child
        const firstChild = children[0] ? children[0] : children;
        if (firstChild.ref.current.setFocus) {
          firstChild.ref.current.setFocus();
        }
      }
      
    } else if (!show && prevProps.show) {
      this.state.prevFocusElement.focus();
    }
  }

  /* Closes modal on outside click */
  handleClickOutside(event) {
    const { show, closeSelf } = this.props;
    
    if (show && event.target.classList.contains('modal')) {
      if (closeSelf) closeSelf(event);
    }
  }

  /* Closes modal on escape key press */
  handleKeyDown(event) {    
    const { closeSelf } = this.props;
    const ESC_KEY = 27;

    if (event.keyCode == ESC_KEY && closeSelf) {
      closeSelf(event);
    }
  }

  render() {
    const { show, children, extraClasses = '', closeSelf } = this.props;
    return (
      <div className={`modal ${extraClasses}${show ? '' : ' hide'}`} onKeyDown={this.handleKeyDown}>
        <div className="modal-content">
          <Button btnType="close" clicked={closeSelf} />
          { children }
        </div>
      </div>
    );
  }
}

export default Modal;
