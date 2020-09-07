import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { WinnersTable } from "./components/WinnersTable";
import { CircularProgress, Container, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const HIGH_SCORES = gql`
  query GetHighScores {
    allScores(sortBy: score_DESC, first: 10) {
      player {
        name
      }
      score
    }
  }
`;

const AUTHENTICATED_USER = gql`
  query {
    authenticatedUser {
      name
    }
  }
`;

interface WinnersListProps {}

export const WinnersList: React.FC<WinnersListProps> = () => {
  const [user, setUser] = useState(undefined);
  const { loading, error, data } = useQuery(HIGH_SCORES);

  const token = window.sessionStorage.getItem("token");

  // eslint-disable-next-line no-empty-pattern
  const [authenticateUserQuery, {}] = useLazyQuery(AUTHENTICATED_USER, {
    onCompleted: (data) => {
      data.authenticatedUser && setUser(data.authenticatedUser.name);
    },
  });

  useEffect(() => {
    authenticateUserQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    console.error(error);
  }

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <Typography variant="h2" component="h2" gutterBottom>
            2048
          </Typography>
          <Typography variant="h3" component="h2" gutterBottom>
            Leaderboard
          </Typography>

          <WinnersTable data={data && data.allScores} />

          {!token && (
            <div style={{ padding: "25px" }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Link to="/login">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: "8px" }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button variant="contained">Register</Button>
                  </Link>
                </Grid>

                <Grid item xs={12}>
                  Login or register to start a new game.
                </Grid>
              </Grid>
            </div>
          )}

          {token && (
            <div style={{ padding: "25px" }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Link to="/game">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: "8px" }}
                    >
                      New game
                    </Button>
                  </Link>

                  {/* <Button
                    variant="contained"
                    onClick={() => window.sessionStorage.removeItem("token")}
                  >
                    Logout
                  </Button> */}
                </Grid>

                <Grid item xs={12}>
                  Hi {user}, nice to see you again!
                </Grid>
              </Grid>
            </div>
          )}
        </React.Fragment>
      )}
    </Container>
  );
};
