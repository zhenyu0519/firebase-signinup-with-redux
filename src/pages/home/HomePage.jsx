import React, { Component } from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Card,
  Typography,
  CardContent,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

export default class HomePage extends Component {
  render() {
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
              <Typography gutterBottom>Name</Typography>
              <Typography gutterBottom>Email</Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }
}
