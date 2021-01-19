import React, { Component } from 'react';
import Button from '../Button/Button';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const { show, closeSelf } = this.props;
    
    if (show && event.target.classList.contains('modal')) {
      if (closeSelf) closeSelf(event);
    }
  }

  render() {
    const { show, children, extraClasses = '', closeSelf } = this.props;
    return (
      <div className={`modal ${extraClasses}${show ? '' : ' hide'}`}>
        <div className="modal-content">
          <Button btnType="close" clicked={closeSelf} />
          { children }
        </div>
      </div>
    );
  }
}

export default Modal;
