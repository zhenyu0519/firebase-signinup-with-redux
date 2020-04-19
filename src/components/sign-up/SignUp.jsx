import React, { Component } from "react";
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
// firebase
import { auth, createUserProfileDocument } from "../../firebase/firebaseUtils";

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    if (
      !isEmpty([firstName, lastName, email, password, passwordConfirmation]) &&
      isPasswordMatch(password, passwordConfirmation) &&
      isEmailFormatValid(email)
    ) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        const displayName = firstName+' '+lastName
        await createUserProfileDocument(user, { displayName });
        this.setState({
          firstName: "",
          lastName:"",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
    } = this.state;
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={this.handleChange}
                  value={firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={this.handleChange}
                  value={lastName}
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
                <Link href="#" variant="body2" underline="none">
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

export default SignUp;
