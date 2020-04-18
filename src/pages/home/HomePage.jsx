import React from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Card,
  Typography,
  CardContent,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { connect } from "react-redux";

const HomePage = ({ currentUser }) => {
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
      </div>
    </Container>
  );
};

const mapStateToProps = ({ auth: { currentUser } }) => ({ currentUser });
export default connect(mapStateToProps)(HomePage);
