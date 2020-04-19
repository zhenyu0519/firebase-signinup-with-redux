import React, { Component } from "react";
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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./signIn.scss";
// utils
import { isEmpty, isEmailFormatValid } from "../../utils/formValidation";
// firbase
import { signInWithGoogle, auth } from "../../firebase/firebaseUtils";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (!isEmpty([email, password]) && isEmailFormatValid(email)) {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        this.setState({ email: "", password: "" });
      } catch (error) {
        console.error(error);
      }
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form" noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit"
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              className="submit"
              onClick={signInWithGoogle}
            >
              Sign In With Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" underline="none">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  underline="none"
                  color="secondary"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default SignIn;
