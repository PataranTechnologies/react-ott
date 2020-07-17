import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

import InitStore from './redux/store';
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <Provider store= { InitStore() }>
    <Switch>
      <Route path="/" exact>
        <LandingPage/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/register">
        <Register/>
      </Route>
      <Redirect to="/"/>
    </Switch>
    </Provider>
  );
}

export default App;
