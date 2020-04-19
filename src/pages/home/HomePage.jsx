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
import { auth } from "../../firebase/firebaseUtils";

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
        <Button
          type="button"
          fullWidth
          variant="contained"
          className="submit"
          onClick={() => auth.signOut()}
        >
          Sign Out
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;
