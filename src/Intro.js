import React, { Component } from 'react';
import './App.css';
import List from './List'

class Intro extends Component {
  render() {
    return (
      <div className="Intro">
        <div><h1>Don't be late,</h1>
        <h2>What time do you need to arrive by?</h2></div>
        <div class="time-input">
          <div class="time-input-wrapper">
            <label for="hr">HR</label>
            <select name="hr">
              <option value="00">00</option>
              <option value="00">01</option>
              <option value="00">02</option>
              <option value="00">03</option>
              <option value="00">04</option>
              <option value="00">05</option>
              <option value="00">06</option>
              <option value="00">07</option>
              <option value="00">08</option>
              <option value="00">09</option>
              <option value="00">10</option>
              <option value="00">11</option>
              <option value="00">12</option>
            </select>
          </div>
          <span id="time-divider">:</span>
          <div class="time-input-wrapper">
            <label for="min">MIN</label>
            <select name="min">
              <option value="00">01</option>
              <option value="00">02</option>
              <option value="00">03</option>
              <option value="00">04</option>
              <option value="00">05</option>
              <option value="00">06</option>
              <option value="00">07</option>
              <option value="00">08</option>
              <option value="00">09</option>
              <option value="00">10</option>
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
