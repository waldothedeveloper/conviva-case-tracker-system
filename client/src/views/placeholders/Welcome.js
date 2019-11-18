import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import convivaLOGO from "../../assets/Conviva.png";

const useStyles = makeStyles({
  cardEmpty: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  im: {
    width: "100%",
    height: "auto"
  },
  fig: {
    width: "30rem",
    height: "auto",
    margin: "0 0 0 6rem"
  }
});

export default function Welcome() {
  const classes = useStyles();

  return (
    <Card className={classes.cardEmpty}>
      <CardContent className={classes.root}>
        <figure className={classes.fig}>
          <img src={convivaLOGO} alt="" className={classes.im} />
        </figure>
        <Typography variant="h3" align="center" gutterBottom>
          Case Status Tracker
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          (PILOT)
        </Typography>
        <Typography align="center" variant="body1" component="p">
          ...a <span style={{ fontWeight: "bold" }}>Live Link </span>to your
          case
        </Typography>
      </CardContent>
    </Card>
  );
}
