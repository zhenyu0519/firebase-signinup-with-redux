import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// components
import HomePage from "./pages/home/HomePage";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
