import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.hrHand = React.createRef();
    this.minHand = React.createRef();

    this.adjustClockHands = this.adjustClockHands.bind(this);
  }

  componentDidMount() {
    this.adjustClockHands();
  }

  componentDidUpdate() {
    this.adjustClockHands();
  }

  /* Formats time into two digit number */
  formatTime(time) {
    return (time < 10) ? `0${time}` : time;
  }

  /* Adjusts clock hands of svg based on time */
  adjustClockHands() {
    const { time: { hr, min } } = this.props;
    const hourRotate = -180 + (hr*30);
    const minRotate = -90 + (min*6);

    // set transform attribute of the different hands
    this.hrHand.current.setAttribute('transform', `rotate(${hourRotate},46.302,68.135)`);
    this.minHand.current.setAttribute('transform', `rotate(${minRotate},46.302,68.135)`);
  }

  render() {
    const { title, time: { hr, min, type }, color = 'green' } = this.props;
    return (
      <div className={`clock ${color}`}>
        <svg width="40" height="40" viewBox="0 0 60 66.145" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-15.875 -32.417)"><ellipse className="fill0" cx="46.302" cy="37.708" rx="9.26" ry="5.292" fill="#02d395" /><ellipse className="fill1" cx="46.302" cy="37.708" rx="7.938" ry="3.969" fill="#a9ecc8" /><circle className="fill0" cx="45.875" cy="68.562" r="30" fill="#02d395" /><circle className="fill1" cx="45.963" cy="68.475" r="28.5" fill="#a9ecc8" /><circle className="fill0" cx="46.225" cy="68.477" r="24" fill="#02d395" /><circle cx="46.313" cy="68.39" r="22.5" fill="#fff" /><g className="fill0" fill="#a9ecc8"><circle cx="46.302" cy="49.615" r="1.323" /><circle cx="27.781" cy="68.135" r="1.323" /><circle cx="64.823" cy="68.135" r="1.323" /><circle cx="46.302" cy="86.656" r="1.323" /></g><g className="fill0" fill="#02d395"><circle cx="46.302" cy="68.135" r="1.323" /><ellipse ref={this.minHand} cx="54.302" cy="68.135" rx="7.938" ry="1.323" /><ellipse ref={this.hrHand} cx="46.302" cy="75.135" rx="1.323" ry="6.482" /></g></g></svg>
        <div>
          <div className="time-title">{ title }</div>  
          <div>{this.formatTime(hr)} : {this.formatTime(min)} {type}</div>
        </div>
      </div>
    );
  }
}

export default Clock;