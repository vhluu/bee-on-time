import React, { Component } from 'react';
import './App.css';
import List from './List'

class Intro extends Component {
  render() {
    var hrOptions = [];
    for (var i = 0; i < 12; i++) {
      hrOptions.push({
        text: '' + Math.floor((i+1)/10) + ((i+1)%10),
        value: i
      });
    }
    
    var minOptions = [];
    for (var i = 0; i < 60; i++) {
      minOptions.push({
        text: '' + Math.floor((i)/10) + ((i)%10),
        value: i
      });
    }
    return (
      <div className="Intro">
        <div><h1>Don't be late,</h1>
        <h2>What time do you need to arrive by?</h2></div>
        <div class="time-input">
          <div class="time-input-wrapper">
            <label for="hr">HR</label>
            <select name="hr">
              { 
                (hrOptions).map((opt) => <option value={opt.value}>{opt.text}</option>)
              }
            </select>
          </div>
          <span id="time-divider">:</span>
          <div class="time-input-wrapper">
            <label for="min">MIN</label>
            <select name="min">
              { 
                (minOptions).map((opt) => <option value={opt.value}>{opt.text}</option>)
              }
            </select>
          </div>
          <select name="period">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <a className="btn-intro" href="/#/main">GET STARTED</a>
      </div>
    );
  }
}

export default Intro;
