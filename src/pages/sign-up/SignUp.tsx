import React from "react";
import Container from "@material-ui/core/Container";
import { SignUpForm } from "./components/form/SignUpForm";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";

export const SignUp: React.FC<{}> = () => {
  return (
    <Container maxWidth="sm" style={{ paddingTop: "25px" }}>
      <Typography variant="h4" component="h1" color="primary">
        Sign up for a free account
      </Typography>
      <Paper style={{ padding: "15px", marginTop: "25px" }}>
        <SignUpForm />
      </Paper>
    </Container>
  );
};
