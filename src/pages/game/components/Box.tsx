import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { red, blue, purple, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(14),
        height: theme.spacing(14),
      },
    },

    box: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
    },
  })
);

interface BoxProps {
  value: number;
  color?: string;
}

export const Box: React.FC<BoxProps> = ({ value }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {value === 2 ? (
        <Paper
          variant="outlined"
          square
          className={classes.box}
          style={{ background: red[500] }}
        >
          {value}
        </Paper>
      ) : value === 4 ? (
        <Paper
          variant="outlined"
          square
          className={classes.box}
          style={{ background: blue[500] }}
        >
          {value}
        </Paper>
      ) : value === 8 ? (
        <Paper
          variant="outlined"
          square
          className={classes.box}
          style={{ background: purple[500] }}
        >
          {value}
        </Paper>
      ) : value === 16 ? (
        <Paper
          variant="outlined"
          square
          className={classes.box}
          style={{ background: green[500] }}
        >
          {value}
        </Paper>
      ) : (
        <Paper variant="outlined" square className={classes.box}>
          {value}
        </Paper>
      )}
    </div>
  );
};
