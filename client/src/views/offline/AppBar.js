import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import convivaLOGO from "../../assets/Conviva.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  offlineBar: {
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  im: {
    width: "100%",
    height: "auto"
  },
  fig: {
    width: "16rem"
  }
}));

export default function ConvivaAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.offlineBar}>
        <Toolbar>
          <figure className={classes.fig}>
            <img src={convivaLOGO} alt="" className={classes.im} />
          </figure>
        </Toolbar>
      </AppBar>
    </div>
  );
}
