import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// components
import HomePage from "./pages/home/HomePage";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
//redux
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/auth/authActions";
// firebase
import { auth, createUserProfileDocument } from "./firebase/firebaseUtils";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // Check if there is user logged in
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // If a use logged in
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const snapShot = await userRef.get();
        const { email, displayName } = snapShot.data();
        setCurrentUser({ email, displayName });
      } else {
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/home"
            render={() =>
              currentUser ? <HomePage /> : <Redirect to="/signin" />
            }
          />
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
  }
}
const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userInfo) => dispatch(setCurrentUser(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
