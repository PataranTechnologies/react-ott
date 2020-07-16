import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
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
  );
}

export default App;
