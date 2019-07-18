import React, { Component } from 'react';
import 'element-theme-default';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import UsersList from './containers/userslist/UsersList';
import Header from './components/header/Header';
class App extends Component {
  render() {
    return (
      <>
        <Header></Header>
        <Switch>
          <Route path="/users" component={UsersList}></Route>
          <Route path="/" component={UsersList}></Route>
        </Switch>
      </>
    )
  }
}

export default App;
