import React from "react";
import Container from "@material-ui/core/Container";
import { LoginForm } from "./components/form/LoginForm";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";

export const Login: React.FC<{}> = () => {
  return (
    <Container maxWidth="sm" style={{ paddingTop: "25px" }}>
      <Typography variant="h4" component="h1" color="primary">
        Login
      </Typography>
      <Paper style={{ padding: "15px", marginTop: "25px" }}>
        <LoginForm />
      </Paper>
    </Container>
  );
};
