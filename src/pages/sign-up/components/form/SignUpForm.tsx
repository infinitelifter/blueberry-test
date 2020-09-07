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

const SIGN_UP = gql`
  mutation CreateUser(
    $name: String
    $email: String
    $isAdmin: Boolean
    $password: String
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        isAdmin: $isAdmin
        password: $password
      }
    ) {
      name
      email
    }
  }
`;

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: number;
};

export const SignUpForm = () => {
  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [CreateUser] = useMutation(SIGN_UP, {
    onCompleted: () => {
      setIsLoading(true);
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
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
      isAdmin: false,
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
              error={errors.firstName?.message ? true : false}
              id="firstName"
              label="First Name"
              name="firstName"
              inputRef={register}
              helperText={errors.firstName?.message}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={errors.lastName?.message ? true : false}
              id="lastName"
              label="Last Name"
              name="lastName"
              inputRef={register}
              helperText={errors.lastName?.message}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
