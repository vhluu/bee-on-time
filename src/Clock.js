import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
  formatTime(time) {
    if (time < 10) return '0' + time;
    else return time;
  }

  render() {
    return (
      <div className="time-wrapper">
        <div className="start-time">
          <svg width="40" height="40" viewBox="0 0 60 66.145" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-15.875 -32.417)"><ellipse cx="46.302" cy="37.708" rx="9.26" ry="5.292" fill="#02d395" /><ellipse cx="46.302" cy="37.708" rx="7.938" ry="3.969" fill="#BDF4CB" /><circle cx="45.875" cy="68.562" r="30" fill="#02d395" /><circle cx="45.963" cy="68.475" r="28.5" fill="#BDF4CB" /><circle cx="46.225" cy="68.477" r="24" fill="#02d395" /><circle cx="46.313" cy="68.39" r="22.5" fill="#fff" /><g fill="#BDF4CB"><circle cx="46.302" cy="49.615" r="1.323" /><circle cx="27.781" cy="68.135" r="1.323" /><circle cx="64.823" cy="68.135" r="1.323" /><circle cx="46.302" cy="86.656" r="1.323" /></g><g fill="#02d395"><circle cx="46.302" cy="68.135" r="1.323" /><ellipse transform="rotate(70)" cx="72.178" cy="-20.211" rx="7.938" ry="1.323" /><ellipse transform="rotate(120)" cx="35.921" cy="-80.618" rx="1.323" ry="6.482" /></g></g></svg>
          <div>
            <div class="time-title">START</div>  
            <div>{this.formatTime(this.props.startTime.hr)} : {this.formatTime(this.props.startTime.min)} {this.props.startTime.type}</div>
          </div>
        </div>
        <div className="end-time">
          <svg width="40" height="40" viewBox="0 0 60 66.145" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-15.875 -32.417)"><ellipse cx="46.302" cy="37.708" rx="9.26" ry="5.292" fill="#e54040" /><ellipse cx="46.302" cy="37.708" rx="7.938" ry="3.969" fill="#FF8A8A" /><circle cx="45.875" cy="68.562" r="30" fill="#e54040" /><circle cx="45.963" cy="68.475" r="28.5" fill="#FF8A8A" /><circle cx="46.225" cy="68.477" r="24" fill="#e54040" /><circle cx="46.313" cy="68.39" r="22.5" fill="#fff" /><g fill="#FF8A8A"><circle cx="46.302" cy="49.615" r="1.323" /><circle cx="27.781" cy="68.135" r="1.323" /><circle cx="64.823" cy="68.135" r="1.323" /><circle cx="46.302" cy="86.656" r="1.323" /></g><g fill="#e54040"><circle cx="46.302" cy="68.135" r="1.323" /><ellipse transform="rotate(70)" cx="72.178" cy="-20.211" rx="7.938" ry="1.323" /><ellipse transform="rotate(120)" cx="35.921" cy="-80.618" rx="1.323" ry="6.482" /></g></g></svg>
          <div>
            <div class="time-title">END</div>
            <div>{this.formatTime(this.props.endTime.hr)} : {this.formatTime(this.props.endTime.min)} {this.props.endTime.type}</div>
          </div>       
        </div>
      </div>
    );
  }
}

export default Clock;