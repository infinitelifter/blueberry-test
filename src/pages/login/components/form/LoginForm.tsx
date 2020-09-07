import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { yupResolver } from "@hookform/resolvers";
import { schema } from "./ValidationSchema";
import { Redirect } from "react-router";
import { LinearProgress, Grid } from "@material-ui/core";
import { useMutation, gql } from "@apollo/client";
import Alert from "@material-ui/lab/Alert";

export const LOGIN = gql`
  mutation authenticateUserWithPassword($email: String, $password: String) {
    authenticateUserWithPassword(email: $email, password: $password) {
      token
      item {
        name
      }
    }
  }
`;

type FormData = {
  email: string;
  password: number;
};

export const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [CreateUser] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setIsLoading(false);
      window.sessionStorage.setItem(
        "token",
        data.authenticateUserWithPassword.token
      );
      setRedirect(true);
    },
    onError: () => {
      setIsLoading(false);
      setError(true);
    },
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);

    const prepareData = {
      email: data.email,
      password: data.password,
    };

    CreateUser({
      variables: prepareData,
    });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      {isLoading && <LinearProgress style={{ margin: "15px 0" }} />}
      {error && (
        <Alert severity="error" style={{ margin: "15px 0" }}>
          Something went wrong
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              error={errors.email?.message ? true : false}
              id="email"
              label="Email address"
              name="email"
              inputRef={register}
              helperText={errors.email?.message}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="password"
              error={errors.password?.message ? true : false}
              id="password"
              label="Create password"
              name="password"
              inputRef={register}
              helperText={errors.password?.message}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};
