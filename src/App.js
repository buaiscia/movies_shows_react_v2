import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Homepage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import Search from "./pages/search/search.component";
import ShowItem from "./pages/showItem/showItem.component";
import NotFound from "./pages/notfound/notfound.component";

import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' >
            <Homepage />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
          <Route path='/show/:movieId' component={ShowItem} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>

    );

  }
}

export default App;
