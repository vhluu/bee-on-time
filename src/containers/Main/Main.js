import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import Clock from '../../components/Clock/Clock';
import Sidebar from '../../components/Sidebar/Sidebar';

import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currList: [],
      startHr: props.userTime.hr || 0,
      startMin: props.userTime.min || 0,
      startType: props.userTime.type || 'PM'
    }

    this.calculateTime = this.calculateTime.bind(this);
  }
  
  /** 
   * Calculates the new start time
   * newTime - a task item's new time, which should be removed from the start time
   * oldTime - a task item's old time, which should be added back to the start time
   */
  calculateTime(newTime, oldTime) {
    let { startHr, startMin, startType } = this.state;
    
    const { hr: newHr = 0, min: newMin = 0 } = newTime || {};
    const { hr: oldHr = 0, min: oldMin = 0 } = oldTime || {};

    let totalHr = newHr - oldHr;
    let totalMin = newMin - oldMin;

    // convert extra minutes into hours
    totalHr += (totalMin >= 0 ? (Math.floor(totalMin / 60)) : (Math.ceil(totalMin / 60)));
    totalMin = (totalMin % 60);

    // if the total hrs > 12, figure out the 12/24 cycles so that we can just change switch between 'AM' or 'PM'
    // ex. if total hrs is 12, and our end time is 1 PM, then we can set start to 1 AM
    if (Math.abs(totalHr) >= 12) {
      if (Math.floor(Math.abs(totalHr)/12) % 2 == 1) { // if odd, then switch time type
        startType = ((startType === 'PM') ? 'AM' : 'PM');
      }
      totalHr = totalHr % 12;
    }

    // Update start hour
    if (totalHr < 0) { // we want to increase start time by totalHrs
      // add total hrs to start time
      startHr += (totalHr * -1);
      if (startHr >= 12) {
        startType = ((startType === 'PM') ? 'AM' : 'PM');
        startHr -= 12;
      }
    } else if (totalHr > 0) { // we want to decrease start time by totalHrs
      if (startHr == 12) {
        startType = ((startType === 'PM') ? 'AM' : 'PM');
      }
      // subtract total hrs from start time
      startHr -= totalHr;
      if (startHr <= 0) {
        if (startHr < 0) {
          startType = ((startType === 'PM') ? 'AM' : 'PM');
        }
        startHr += 12;
      }
    }

    // Update start min
    if (totalMin < 0) { // we want to increase start time by totalMin
      // subtract total min from start time 
      startMin += (totalMin * -1);
      if (startMin >= 60) {
        startHr++;
        if (startHr == 13) {
          startHr = 1;
        } else if (startHr == 12) {
          startType = ((startType === 'PM') ? 'AM' : 'PM');
        }
        startMin -= 60;
      }
    } else if (totalMin > 0) { // we want to increase start time by totalMin
      // subtract total min from start time 
      startMin -= totalMin;
      if (startMin < 0) {
        startHr--;
        if (startHr == 0) {
          startHr = 12;
        } else if (startHr == 11) {
          startType = ((startType === 'PM') ? 'AM' : 'PM');
        }
        startMin += 60;
      }
    }

    this.setState({ startHr, startMin, startType });
  }

  render() {
    const { userTime } = this.props;
    const { startHr, startMin, startType } = this.state;
    const start = {hr: startHr, min: startMin, type: startType};

    return (
      <div className="Main">
        <Header />
        <main>
          <div className="main-wrapper">
            <Sidebar>
              <div className="main-desc">
                <span>Trying to be on time?</span>
                <br/>Tell us what you need to do &amp; we'll help you figure out what time you should start
              </div>
              <div className="clock-wrapper">
                <Clock time={start} title="Start" />
                <Clock time={userTime} title="End" color="red" />
              </div>
            </Sidebar>
            <List updateTime={this.calculateTime}/>
          </div>
        </main>
        
      </div>
    );
  }
}

export default Main;
