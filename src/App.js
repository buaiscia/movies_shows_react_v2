import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Homepage from "./pages/homepage/homepage.component";

import './App.css';


class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Homepage />
          </Route>
        </Switch>
      </>
    );

  }
}

export default App;
