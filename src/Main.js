import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import List from './components/List';
import Clock from './components/Clock';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleListUpdate = this.handleListUpdate.bind(this);
    this.state = {
      currList: []
    }
  }

  handleListUpdate(list) {
    this.setState({ currList: list });
  }

  render() {
    // get the new hours and minutes
    var start, end, hr, min;
    console.log(this.props.userTime);
    start = { ...this.props.userTime };
    end = { ...this.props.userTime };
    hr = 0; min = 0;
    const list = this.state.currList;
    for (var i = 0; i < list.length; i++) {
      hr += list[i].hr;
      min += list[i].min;
    }
    hr += Math.floor(min / 60);
    min = (min % 60);

    // if the total hrs is 12 or greater, we will figure out the 12/24 cycles so that
    // we change just change from 'AM' or 'PM'
    // ex. if total hrs is 12, and end time is 1 PM, we just set start to 1 AM
    if (hr >= 12 && Math.floor(hr/12) % 2 == 0) { // is even
      hr = hr%12;
    }
    else if (hr >= 12 && Math.floor(hr/12) % 2 == 1) { // is odd
      start.type = ((start.type === 'PM') ? 'AM' : 'PM');
      hr = hr%12;
    }

    console.log(`${start.hr}, ${start.min}, ${start.type}`);
    console.log(`${end.hr}, ${end.min}, ${end.type}`);
    console.log(`${hr}, ${min}`);

    // subtracts total min from start time 
    if (start.min < min) {
      start.min = (start.min + 60) - min;
      if (start.hr === 1) {
        start.hr = 12; 
      }
      else {
        if (start.hr === 12) {
          start.type = ((start.type === 'PM') ? 'AM' : 'PM');
        }
        start.hr--;
      }
    }
    else {
      start.min -= min;
    }

    // subtracts total hrs from start time
    if (start.hr < hr) {
      start.hr = start.hr - hr + 12;
      start.type = ((start.type === 'PM') ? 'AM' : 'PM');
    }
    else {
      if (start.hr === 12 && hr > 0) {
        start.type = ((start.type === 'PM') ? 'AM' : 'PM');
      }
      start.hr -= hr;
      if (start.hr < 1) {
        start.hr += 12;
        if (start.hr < 12 && start.hr > end.hr) start.type = ((start.type === 'PM') ? 'AM' : 'PM');
      }
    }

    console.log('After');
    console.log(`${start.hr}, ${start.min}, ${start.type}`);
    console.log(`${end.hr}, ${end.min}, ${end.type}`);
    console.log(`${hr}, ${min}`);

    return (
      <div className="Main">
        <Header/>
        <main>
          <div className="main-wrapper">
          <Clock startTime={start} endTime={end} />
          <List updateList={this.handleListUpdate}/>
          </div>
        </main>
        
      </div>
    );
  }
}

export default Main;
