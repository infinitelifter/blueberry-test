import React, { useState, useEffect } from "react";
import {
  useMutation,
  gql,
  useLazyQuery,
  useApolloClient,
} from "@apollo/client";
import {
  CircularProgress,
  Container,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { Board } from "./components/Board";

const NEW_GAME = gql`
  query {
    newGame {
      state
      score
      finished
    }
  }
`;

const PROCESS_GAME = gql`
  mutation ProcessGame(
    $state: [[Int!]!]!
    $score: Int!
    $direction: Direction!
  ) {
    processGame(game: { state: $state, score: $score, direction: $direction }) {
      state
      score
      finished
    }
  }
`;

let initialMatrix = Array(4)
  .fill(null)
  .map(() => Array(4).fill(0));

export const Game: React.FC<{}> = () => {
  const [gameState, setGameState] = useState({
    state: initialMatrix,
    score: 0,
    finished: false,
  });

  const client = useApolloClient();

  const [newGameQuery, { loading }] = useLazyQuery(NEW_GAME, {
    onCompleted: (d) => {
      setGameState(d.newGame);
    },
  });

  const [ProcessGame] = useMutation(PROCESS_GAME, {
    onCompleted: (data) => setGameState(data.processGame),
  });

  useEffect(() => {
    newGameQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  onkeydown = (e) => {
    const handleArrowPress = (direction: string) =>
      ProcessGame({
        variables: {
          state: gameState.state,
          score: gameState.score,
          direction: direction,
        },
      });

    if (e.keyCode === 37) {
      handleArrowPress("Left");
    }
    if (e.keyCode === 38) {
      handleArrowPress("Up");
    }
    if (e.keyCode === 39) {
      handleArrowPress("Right");
    }
    if (e.keyCode === 40) {
      handleArrowPress("Down");
    }
  };

  return (
    <Container maxWidth="sm">
      {loading ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                style={{ textAlign: "left" }}
              >
                2048
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  textAlign: "right",
                  height: "100%",
                  paddingTop: "10px",
                }}
              >
                Score: {gameState.score}
              </div>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ textAlign: "left" }}>
                Join the numbers and get to the <strong>2048 tile!</strong>
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ textAlign: "right", height: "100%", paddingTop: "10px" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  client.resetStore();
                  newGameQuery();
                }}
              >
                New Game
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Board gameMatrix={gameState.state} />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Container>
  );
};
