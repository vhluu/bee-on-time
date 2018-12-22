import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import List from './List';
import Clock from './Clock';

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

    console.log(`${start.hr}, ${start.min}, ${start.type}`);
    console.log(`${end.hr}, ${end.min}, ${end.type}`);
    console.log(`${hr}, ${min}`);

    // calculate new start minute
    if (start.min < min) {
      start.min = (start.min + 60) - min;
      if (start.hr === 1) {
        start.hr = 12;
        start.type = ((start.type === 'PM') ? 'AM' : 'PM');
      }
      else {
        start.hr--;
      }
    }
    else {
      start.min -= min;
    }

    // calculate new start hr 
    if (start.hr < hr) {
      start.hr = start.hr - hr + 12;
      start.type = ((start.type === 'PM') ? 'AM' : 'PM');
    }
    else {
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
          <Clock startTime={start} endTime={end} />
          <List updateList={this.handleListUpdate}/>
        </main>
        
      </div>
    );
  }
}

export default Main;
