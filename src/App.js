import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// components
import HomePage from "./pages/home/HomePage";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
//redux
import { connect } from "react-redux";

const App = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route
          exact
          path="/"
          render={() => (currentUser ? <Redirect to="/home" /> : <SignIn />)}
        />
        <Route
          exact
          path="/signup"
          render={() => (currentUser ? <Redirect to="/home" /> : <SignUp />)}
        />
        <Route
          exact
          path="/signin"
          render={() => (currentUser ? <Redirect to="/home" /> : <SignIn />)}
        />
      </Switch>
    </div>
  );
};
const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(App);
