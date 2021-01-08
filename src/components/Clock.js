import React, { Component } from 'react';
import '../App.css';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.startHrHand = React.createRef();
    this.startMinHand = React.createRef();
    this.endHrHand = React.createRef();
    this.endMinHand = React.createRef();

    this.adjustClockHands = this.adjustClockHands.bind(this);
  }

  componentDidMount() {
    this.adjustClockHands();
  }

  componentDidUpdate() {
    this.adjustClockHands();
  }

  formatTime(time) {
    if (time < 10) return '0' + time;
    else return time;
  }

  // adjust clock hands of svg based on time
  adjustClockHands() {
    // hr -> (hr*30 - ((hr < 6 ? -1 : 1)*180)) 
    //var calculateHr = (hr) => ((hr < 6 ? -1 : 1)*180);
    var calculateHr = (hr) => (-180 + (hr*30));
    var calculateMin = (min) => (-90 + (min*6));
    var sHRotate = calculateHr(this.props.startTime.hr);
    var sMRotate = calculateMin(this.props.startTime.min);
    var eHRotate = calculateHr(this.props.endTime.hr);
    var eMRotate = calculateMin(this.props.endTime.min);

    // set transform attribute of the different hands
    this.startHrHand.current.setAttribute('transform', `rotate(${sHRotate},46.302,68.135)`);
    this.startMinHand.current.setAttribute('transform', `rotate(${sMRotate},46.302,68.135)`);
    this.endHrHand.current.setAttribute('transform', `rotate(${eHRotate},46.302,68.135)`);
    this.endMinHand.current.setAttribute('transform', `rotate(${eMRotate},46.302,68.135)`);
  }




  // minute hand: 

  render() {
    return (
      <div className="time-wrapper">
        <div className="main-desc">
          <span>Trying to be on time?</span>
          <br/>Tell us what you need to do &amp; we'll help you figure out what time you should start getting ready</div>
        <div className="start-time">
          <svg width="40" height="40" viewBox="0 0 60 66.145" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-15.875 -32.417)"><ellipse cx="46.302" cy="37.708" rx="9.26" ry="5.292" fill="#02d395" /><ellipse cx="46.302" cy="37.708" rx="7.938" ry="3.969" fill="#a9ecc8" /><circle cx="45.875" cy="68.562" r="30" fill="#02d395" /><circle cx="45.963" cy="68.475" r="28.5" fill="#a9ecc8" /><circle cx="46.225" cy="68.477" r="24" fill="#02d395" /><circle cx="46.313" cy="68.39" r="22.5" fill="#fff" /><g fill="#a9ecc8"><circle cx="46.302" cy="49.615" r="1.323" /><circle cx="27.781" cy="68.135" r="1.323" /><circle cx="64.823" cy="68.135" r="1.323" /><circle cx="46.302" cy="86.656" r="1.323" /></g><g fill="#02d395"><circle cx="46.302" cy="68.135" r="1.323" /><ellipse ref={this.startMinHand} cx="54.302" cy="68.135" rx="7.938" ry="1.323" /><ellipse ref={this.startHrHand} cx="46.302" cy="75.135" rx="1.323" ry="6.482" /></g></g></svg>
          <div>
            <div className="time-title">START</div>  
            <div>{this.formatTime(this.props.startTime.hr)} : {this.formatTime(this.props.startTime.min)} {this.props.startTime.type}</div>
          </div>
        </div>
        <div className="end-time">
          <svg width="40" height="40" viewBox="0 0 60 66.145" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-15.875 -32.417)"><ellipse cx="46.302" cy="37.708" rx="9.26" ry="5.292" fill="#e54040" /><ellipse cx="46.302" cy="37.708" rx="7.938" ry="3.969" fill="#FF8A8A" /><circle cx="45.875" cy="68.562" r="30" fill="#e54040" /><circle cx="45.963" cy="68.475" r="28.5" fill="#FF8A8A" /><circle cx="46.225" cy="68.477" r="24" fill="#e54040" /><circle cx="46.313" cy="68.39" r="22.5" fill="#fff" /><g fill="#FF8A8A"><circle cx="46.302" cy="49.615" r="1.323" /><circle cx="27.781" cy="68.135" r="1.323" /><circle cx="64.823" cy="68.135" r="1.323" /><circle cx="46.302" cy="86.656" r="1.323" /></g><g fill="#e54040"><circle cx="46.302" cy="68.135" r="1.323" /><ellipse ref={this.endMinHand} cx="54.302" cy="68.135" rx="7.938" ry="1.323" /><ellipse ref={this.endHrHand} cx="46.302" cy="75.135" rx="1.323" ry="6.482" /></g></g></svg>
          <div>
            <div className="time-title">END</div>
            <div>{this.formatTime(this.props.endTime.hr)} : {this.formatTime(this.props.endTime.min)} {this.props.endTime.type}</div>
          </div>       
        </div>
      </div>
    );
  }
}

export default Clock;