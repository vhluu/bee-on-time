import React, { Component } from 'react';
import './App.css';
import List from './List';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Intro from './Intro';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="content">
          <Route exact path="/" component={Intro} />
          <Route path="/main" component={Main} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
