import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Homepage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import Search from "./pages/search/search.component";
import NotFound from "./pages/notfound/notfound.component";

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
          <Route path='/search'>
            <Search />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </>
    );

  }
}

export default App;
