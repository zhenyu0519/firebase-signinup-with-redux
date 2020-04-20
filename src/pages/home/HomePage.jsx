import React from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Card,
  Typography,
  CardContent,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
// redux
import { connect } from "react-redux";
import { userSignOut } from "../../redux/auth/authActions";

const HomePage = ({ currentUser, userSignOut }) => {
  const { displayName, email } = currentUser;
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar">
          <HomeIcon />
        </Avatar>
        <Card>
          <CardContent>
            <Typography component="h3" variant="h5" gutterBottom>
              Welcome To Home Page
            </Typography>
            <Typography gutterBottom>{displayName}</Typography>
            <Typography gutterBottom>{email}</Typography>
          </CardContent>
        </Card>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className="submit"
          onClick={userSignOut}
        >
          Sign Out
        </Button>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ auth: { currentUser } }) => ({ currentUser });
const mapDispatchToProps = (dispatch) => ({
  userSignOut: () => dispatch(userSignOut()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
