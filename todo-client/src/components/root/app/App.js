import React from "react";
import "./App.css";
import Signup from "../../user/Signup";
import Login from "../../user/Login";
import { Switch, Route, Router } from "react-router-dom";
import Main from "../../Main";
import { history } from "../../../helpers/history";
import { PrivateRoute } from "../../PrivateRoute";
import NewTask from "../../task/NewTask";

function App() {
  return (
    <Router history={history}>
    <Switch>
    <PrivateRoute exact path="/" component={Main} />
    <PrivateRoute exact path="/new-task" component={NewTask} />
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
    </Switch></Router>
  );
}

export default App;
