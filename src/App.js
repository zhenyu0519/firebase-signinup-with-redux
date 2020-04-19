import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// components
import HomePage from "./pages/home/HomePage";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
//redux
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/auth/authActions";
// firebase auth
import { auth, createUserProfileDocument } from "./firebase/firebaseUtils";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // Check if there is user logged in
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // If a use logged in
      if (userAuth) {
        // Get the logged in user's reference from firebase
        const userRef = await createUserProfileDocument(userAuth);
        // Get the logged in user's simple data based on reference
        userRef.onSnapshot((snapShot) => {
          console.log('there')
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      console.log('here',userAuth);
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    console.log("currentUser", currentUser);
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/home"
            render={() =>
              currentUser ? (
                <HomePage currentUser={currentUser} />
              ) : (
                <Redirect to="/signin" />
              )
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
const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
