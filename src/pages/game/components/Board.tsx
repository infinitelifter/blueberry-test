import React from "react";
import { TMatrix } from "../../../types";
import { Grid } from "@material-ui/core";
import { Box } from "./Box";
import { Paper } from "@material-ui/core";

interface BoardProps {
  gameMatrix: TMatrix;
}

export const Board: React.FC<BoardProps> = ({ gameMatrix }) => {
  return (
    <div>
      <Paper variant="outlined" style={{ padding: "25px", margin: "25px 0" }}>
        <Grid container spacing={0}>
          {gameMatrix &&
            gameMatrix.map((row, index) => {
              return row.map((column, i) => (
                <Grid item xs={3} key={`row-${index}-column-${i}`}>
                  <Box value={column} />
                </Grid>
              ));
            })}
        </Grid>
      </Paper>
    </div>
  );
};
