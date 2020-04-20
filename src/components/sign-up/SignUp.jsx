import React, { Component } from "react";
// redux
import { connect } from "react-redux";
import { userSignUp } from "../../redux/auth/authActions";
// style
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import "./signUp.scss";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
// utils
import {
  isEmpty,
  isPasswordMatch,
  isEmailFormatValid,
} from "../../utils/formValidation";
// route
import { withRouter } from "react-router-dom";

class SignUp extends Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { displayName, email, password, passwordConfirmation } = this.state;
    if (
      !isEmpty([displayName, email, password, passwordConfirmation]) &&
      isPasswordMatch(password, passwordConfirmation) &&
      isEmailFormatValid(email)
    ) {
      this.props.userSignUp({ email, password, displayName });
    }
  };

  render() {
    const { displayName, email, password, passwordConfirmation } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <AccountBoxIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className="form" noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="displayName"
                  name="displayName"
                  variant="outlined"
                  required
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  autoFocus
                  onChange={this.handleChange}
                  value={displayName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleChange}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                  value={passwordConfirmation}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  underline="none"
                  onClick={() => {
                    this.props.history.push("/signin");
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapDispatch = (dispatch) => ({
  userSignUp: (credential) => dispatch(userSignUp(credential)),
});

export default withRouter(connect(null, mapDispatch)(SignUp));
