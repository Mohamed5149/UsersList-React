import React, { Component } from 'react';
import 'element-theme-default';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import UsersList from './containers/userslist/UsersList';
import Header from './components/header/Header';
import AddUser from './containers/add-edituser/Add-EditUser';
import LoginForm from './containers/loginForm/LoginForm';

class App extends Component {
  render() {
    return (
      <>
        <Header></Header>
        <Switch>
          <Route path="/Users" component={UsersList}></Route>
          <Route path="/Adduser" component={AddUser}></Route>
          <Route path="/Edituser/:id" component={AddUser}></Route>
          <Route path="/Login" component={LoginForm}></Route>
        </Switch>
      </>
    )
  }
}

export default App;
