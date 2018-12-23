import React, { Component } from 'react';
import './App.css';
import Main from './Main';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      timeInput: {
        hr: 1,
        min: 0,
        type: 'PM'
      }
    } 
    this.goToMain = this.goToMain.bind(this);
    this.hrChange = this.hrChange.bind(this);
    this.minChange = this.minChange.bind(this);
    this.periodChange = this.periodChange.bind(this);
  }

  goToMain() {
    this.setState((state, props) => ({
      navigate: !(state.navigate)
    }));
  }

  hrChange(event) {
    this.setState({
      timeInput: {
        ...this.state.timeInput,
        hr: parseInt(event.target.value),
      },
    });
  }

  minChange(event) {
    this.setState({
      timeInput: {
        ...this.state.timeInput,
        min: parseInt(event.target.value),
      },
    });
  }

  periodChange(event) {
    this.setState({
      timeInput: {
        ...this.state.timeInput,
        type: event.target.value,
      },
    });
  }

  render() {
    var hrOptions = []; // generate hr options for dropdown
    for (var i = 0; i < 12; i++) {
      hrOptions.push({
        text: '' + Math.floor((i+1)/10) + ((i+1)%10),
        value: i+1
      });
    }
    
    var minOptions = []; // generate min options for dropdown
    for (var j = 0; j < 60; j++) {
      minOptions.push({
        text: '' + Math.floor((j)/10) + ((j)%10),
        value: j
      });
    }
    return (
      <div>
        { this.state.navigate && <Main userTime={this.state.timeInput}/> /* navigate to main page */} 
        { !this.state.navigate && <div className="Intro">
          <div>
            <h1>Don't be late,</h1>
            <svg className="intro-bee" viewBox="0 0 166.875 193.684" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(-6.74 -27.418)">
                <ellipse transform="matrix(.98904 -.14762 .16575 .98617 0 0)" cx="78.828" cy="122.93" rx="58.203" ry="40.006" fill="none"
                  stroke="#fff" strokeWidth="5.144" />
                <g>
                  <path d="M90.785 148.99a38.58 21.537 79.983 0 1-8.6-1.688 36.078 15.87 80.207 0 0 1.024-.07 36.078 15.87 80.207 0 0 9.72-37.921 36.078 15.87 80.207 0 0-21.526-33.245 38.58 21.537 79.983 0 1 6.594-3.163 38.58 21.537 79.983 0 1 27.7 34.863 38.58 21.537 79.983 0 1-14.912 41.223z" />
                  <path d="M126.93 144.74a38.58 21.537 79.983 0 1-8.6-1.688 36.078 15.87 80.207 0 0 1.024-.07 36.078 15.87 80.207 0 0 9.72-37.921 36.078 15.87 80.207 0 0-21.526-33.245 38.58 21.537 79.983 0 1 6.594-3.163 38.58 21.537 79.983 0 1 27.7 34.863 38.58 21.537 79.983 0 1-14.912 41.223z" />
                  <ellipse transform="rotate(-9)" cx="34.419" cy="112.85" rx="1.896" ry="2.646" />
                  <ellipse transform="rotate(-9)" cx="55.586" cy="112.47" rx="1.896" ry="2.646" />
                </g>
                <path d="M47.281 127.69c.275.317-1.04 1.953-3.282 4.272-.899.93-2.346 2.356-3.402 3.553-.466.53-.928 1.072-1.28 1.626-.188.368-.374.617-.393.74-.004.024-.001.043.009.058-.06-.14-.017-.142-.01-.101.145.146.484.233.892.358 1.072.277 2.288.314 3.379.325 1.624.02 3.397-.275 4.494-.433a11.18 11.18 0 0 1 1.259-.121c.286-.055.408.036.413.038.038.797-.03.826.012.59-.275-.2-.46-.305-.435-.452.017-.106.218-.24.62-.253.158-.186.395-.083.304.815-.268.218-.515.299-.653.351-.317.148-.69.308-1.099.49-1.107.487-2.814 1.092-4.8 1.295-1.176.125-2.585.172-4.06-.122a4.71 4.71 0 0 1-1.894-.768c-.617-.427-1.03-1.16-1.066-2.1.015-.16.038-.313.067-.46.15-.762.46-1.326.763-1.7a13.527 13.527 0 0 1 1.61-1.92c1.325-1.347 2.766-2.5 3.891-3.358 2.575-1.967 4.385-3.04 4.661-2.723zM118.41 106.45c.275.317-1.04 1.953-3.282 4.272-.899.93-2.346 2.356-3.402 3.553-.466.53-.928 1.072-1.28 1.626-.188.369-.374.617-.393.74-.004.024-.001.043.009.058-.06-.14-.017-.141-.01-.101.145.146.484.233.893.358 1.072.277 2.287.314 3.378.326 1.624.019 3.397-.276 4.494-.434a11.18 11.18 0 0 1 1.259-.121c.286-.055.409.036.413.039.038.796-.03.825.013.59-.276-.201-.46-.306-.436-.453.018-.106.218-.24.62-.252.159-.187.395-.083.304.814-.267.218-.515.299-.652.351-.317.148-.691.308-1.1.491-1.107.486-2.813 1.091-4.8 1.294-1.176.125-2.585.172-4.06-.122a4.71 4.71 0 0 1-1.894-.768c-.617-.426-1.03-1.16-1.066-2.1.016-.16.038-.313.067-.46.15-.762.46-1.326.763-1.7a13.526 13.526 0 0 1 1.611-1.92c1.325-1.347 2.765-2.5 3.89-3.358 2.575-1.967 4.386-3.04 4.661-2.723zM86.491 70.879c.075-.022-1.856-2.865-2.678-8.664-.385-2.748-.333-6.27.926-9.962 1.272-3.702 3.418-7.307 6.392-10.928 2.65-3.245 5.952-6.475 9.965-9.084 4.55-2.998 10.455-5.201 16.503-4.769 1.538.11 3.055.39 4.533.852 2.958.937 5.61 2.77 7.3 5.347 1.92 3.064 2.21 6.692 1.614 9.825-.88 4.713-3.104 8.943-5.075 12.347a85.198 85.198 0 0 1-7.312 10.727c-1.928 2.419-3.457 4.095-5.19 5.47-1.063.855-2.011 1.364-2.953 1.59-2.217.5-2.051-1.082-2.291-.835.089-.092.856.652 2.074.13.79-.309 1.497-.831 2.442-1.721 1.547-1.476 2.811-3.101 4.614-5.62a99.161 99.161 0 0 0 6.723-10.79c1.811-3.413 3.857-7.493 4.536-11.72.42-2.695.187-5.724-1.353-7.992-1.274-1.988-3.47-3.435-5.937-4.244a15.9 15.9 0 0 0-3.91-.761c-5.264-.37-10.67 1.653-14.944 4.309-3.774 2.38-6.957 5.387-9.57 8.422-2.927 3.421-5.054 6.703-6.369 10.1-1.289 3.3-1.52 6.563-1.341 9.164.37 5.526 1.545 8.737 1.301 8.809z" />
                <path d="M92.545 75.278c-.022-.075-2.865 1.856-8.664 2.678-2.748.385-6.27.333-9.962-.926-3.702-1.271-7.307-3.418-10.928-6.392-3.245-2.65-6.475-5.952-9.084-9.965-2.998-4.55-5.201-10.455-4.769-16.503.11-1.538.39-3.055.852-4.533.937-2.957 2.769-5.61 5.347-7.3 3.064-1.92 6.692-2.21 9.825-1.613 4.713.879 8.943 3.103 12.347 5.074a85.198 85.198 0 0 1 10.727 7.313c2.418 1.927 4.095 3.456 5.47 5.19.855 1.062 1.364 2.01 1.59 2.952.5 2.217-1.082 2.051-.835 2.291-.092-.089.652-.856.13-2.074-.31-.79-.832-1.497-1.721-2.442-1.476-1.547-3.101-2.811-5.62-4.614a99.161 99.161 0 0 0-10.79-6.723c-3.413-1.811-7.493-3.856-11.72-4.536-2.695-.42-5.724-.187-7.993 1.354-1.987 1.273-3.434 3.47-4.243 5.937a15.9 15.9 0 0 0-.761 3.908c-.37 5.265 1.653 10.671 4.309 14.945 2.38 3.774 5.386 6.957 8.422 9.57 3.421 2.928 6.703 5.054 10.1 6.369 3.3 1.289 6.562 1.52 9.164 1.342 5.526-.371 8.737-1.545 8.808-1.302zM53.652 114.46c.41-.605 2.834 1.093 6.523 2.786.533.266 1.297.371 2.26.653.62.187 1.249.242 1.715-.027.056-.022.111-.045.167-.07 1.917-.816 3.867-2.295 5.34-3.348 2.783-1.996 4.466-3.693 4.901-3.305.27.24-.762 2.472-3.467 5.031-1.365 1.309-3.3 2.986-5.723 4.048-.069.03-.137.06-.205.088a5.406 5.406 0 0 1-3.507.037c-.803-.281-1.637-.48-2.593-1.001-3.768-2.241-5.59-4.628-5.411-4.892zM82.315 96.876c.459-.026.806 1.508 1.337 3.803.26.96.366 2.215.815 2.578-.065-.14-.212-.174-.588-.205-.107.07-.135.003.06-.137.235-.267.427-.599.58-.974a5.16 5.16 0 0 0 .208-.636c.307-.812-.24-1.95-.766-2.849-.573-.889-1.402-1.94-1.86-2.56-.138-.137-.117-.185-.045-.145.606-.04.874-.172.921-.428-.4.593-.396 1.538-.662 1.553-.066.004-.82-.476-.745-1.873.075-.376.453-.618 1.175-.6.285.15.45.281.496.324a14.655 14.655 0 0 1 2.576 2.323c.952 1.05 1.826 2.756 1.482 4.838-.073.354-.18.71-.324 1.058a5.805 5.805 0 0 1-1.096 1.725c-.244.338-.73.68-1.45.892-.901.085-1.586-.233-1.965-.788-.942-1.494-.89-2.996-.855-3.844-.061-2.482.335-4.034.706-4.055z" />
                <ellipse cx="70.405" cy="189.35" rx="60.854" ry="29.104" fill="none" stroke="#fff" strokeWidth="5.292" />
                <ellipse cx="69.876" cy="178.99" rx="50.389" ry="18.639" fill="none" stroke="#fff" strokeWidth="5.056" />
                <path d="M68.814 176.117l-1.81 4.973-14.917-5.43 1.81-4.972z" />
                <path d="M85.312 169.206l1.81 4.973-19.89 7.24-1.81-4.973z" />
                <circle cx="41.301" cy="171.59" r="1.5" />
                <circle cx="47.348" cy="187.84" r="1.5" />
                <circle cx="98.753" cy="185.95" r="1.5" />
                <circle cx="92.705" cy="169.32" r="1.5" />
                <path d="M28.465 157.5c-.404.025-.813.065-1.226.12-3.306.429-6.943 1.738-10.49 3.804-3.546 2.066-6.352 4.511-8.125 7.04-.886 1.265-1.528 2.556-1.782 3.942-.254 1.385-.064 2.97.908 4.3s2.518 2.125 4.04 2.476c1.522.35 3.103.347 4.756.132.136-.017.273-.039.41-.06a8.755 11.212 87 0 1-2.343-4.859c-.711.031-1.29-.017-1.67-.105-.534-.123-.592-.233-.608-.255-.016-.022-.105-.112-.016-.598.09-.486.411-1.261 1.022-2.133 1.221-1.743 3.54-3.848 6.538-5.594s6.088-2.794 8.367-3.09c1.139-.148 2.063-.098 2.596.025.534.123.592.23.608.253.017.022.105.114.016.6-.09.486-.41 1.262-1.022 2.133a.54.54 0 0 0-.014.02 8.755 11.212 87 0 1 4.633 2.951c.032-.044.066-.088.097-.133.886-1.265 1.528-2.555 1.782-3.94.254-1.386.064-2.97-.908-4.302s-2.518-2.125-4.04-2.476c-1.141-.263-2.316-.326-3.53-.25z"
                  color="#fff" solid-color="#fff" />
                <path d="M161.2 73.632c.106-.302 3.45-.176 7.867 1.904 1.008.448 2.275 1.12 3.301 2.331a3.958 3.958 0 0 1 .313 4.294c-1.208 1.989-3.058 3.2-4.383 4.04-3.873 2.57-6.87 3.662-7.098 3.306-.332-.52 2.215-2.395 5.696-5.218 1.228-1.032 2.827-2.158 3.49-3.439.056-.084.1-.181.13-.286.11-.383.035-.838-.198-1.088-.48-.707-1.468-1.267-2.368-1.826-3.878-2.301-6.993-3.324-6.75-4.018zM156.29 70.076c.063-.07-1.221.405-2.002-1.372-.132-.51-.06-1.075.289-1.523.43-.545.974-.919 1.502-1.159 1.714-.882 3.508-1.338 5.756-1.85.31-.071.622-.141.937-.21 1.62-.349 4.194-.82 5.392-1.054 3.147-.663 4.811-1.733 5.172-1.402.45.412-1.028 2.47-4.578 3.617-1.652.563-3.398.99-5.428 1.427l-.925.196c-2.59.558-3.667.636-5.523 1.21-.49.183-.785.227-.968.385-.051.008-.126.032-.145.02-.236.64.71 1.505.521 1.715z" />
                <path d="M158.22 53.413c.278 0-1.08-.312.134-1.335.838-.411 1.93-.245 2.835.211 1.628.521 3.365 1.337 5.412 2.49.591.33 1.206.686 1.823 1.068a28.056 28.056 0 0 1 3.208 2.28 4.227 4.227 0 0 1 1.987 2.74c-.084 1.197-.61 1.766-.997 1.955-1.707 1.367-2.909 2.084-3.177 1.816-.268-.268.45-1.47 1.816-3.177.18-.385.429-.554.206-.271.065-.211-.605-.376-1.353-1.088-.956-.672-1.94-1.297-3.083-2.003-.594-.367-1.181-.726-1.752-1.082-1.903-1.178-3.552-2.229-4.858-3.013-1.057-.432-1.362-.966-1.688-.926-.012-.525-.323.335-.513.335zM155.87 106.58c-.216-.36 1.364-1.742 3.974-3.637 1.047-.76 2.72-1.913 3.968-2.908.55-.442 1.099-.895 1.542-1.38.25-.33.475-.542.516-.66.008-.023.009-.043 0-.059.036.149-.007.142-.008.102-.117-.17-.435-.314-.816-.508-1.008-.46-2.198-.706-3.27-.907-1.596-.301-3.394-.32-4.502-.354-.481-.01-.916-.051-1.26-.099-.292.004-.397-.106-.4-.11.1-.791.172-.808.09-.583.236.246.4.38.35.521-.036.102-.257.2-.654.141-.19.156-.404.013-.158-.855.3-.168.558-.205.703-.232.338-.091.734-.183 1.168-.293 1.175-.286 2.96-.586 4.952-.44 1.18.08 2.575.279 3.977.825a4.71 4.71 0 0 1 1.731 1.085c.534.527.814 1.321.686 2.253a4.797 4.797 0 0 1-.146.44c-.28.726-.684 1.227-1.047 1.543a13.53 13.53 0 0 1-1.92 1.611c-1.538 1.097-3.157 1.982-4.414 2.632-2.877 1.49-4.846 2.232-5.063 1.872z" />
              </g>
            </svg>
            <h2>What time do you need to arrive by?</h2>
          </div>
          <div className="time-input">
            <div className="time-input-wrapper">
              <label htmlFor="hr">HR</label>
              <select name="hr" onChange={this.hrChange}>
                { 
                  (hrOptions).map((opt) => <option key={opt.value} value={opt.value}>{opt.text}</option>)
                }
              </select>
            </div>
            <span id="time-divider">:</span>
            <div className="time-input-wrapper">
              <label htmlFor="min">MIN</label>
              <select name="min" onChange={this.minChange}>
                { 
                  (minOptions).map((opt) => <option key={opt.value} value={opt.value}>{opt.text}</option>)
                }
              </select>
            </div>
            <select name="period" onChange={this.periodChange}>
              <option value="PM">PM</option>
              <option value="AM">AM</option>
            </select>
          </div>
          <a className="btn-intro clickable" onClick={this.goToMain}>Get Started</a>
        </div> }   
      </div>
    );
  }
}

export default Intro;
