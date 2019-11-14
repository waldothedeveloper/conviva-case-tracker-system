import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  offline: {
    padding: "10% 5% 2% 5%",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function OfflineMessage() {
  const classes = useStyles();
  return (
    <Grid container className={classes.offline}>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
        <Typography align="center" variant="h2" gutterBottom>
          Seems like you're offline.
        </Typography>
        <Typography align="center" variant="body1" color="error">
          Please check your internet connection
        </Typography>
      </Grid>
    </Grid>
  );
}
