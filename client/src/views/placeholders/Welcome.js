import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import convivaLOGO from "../../assets/Conviva.png";

const useStyles = makeStyles({
  cardEmpty: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh"
  },
  im: {
    width: "100%",
    height: "auto"
  },
  fig: {
    width: "30rem",
    margin: "0 0 0 -3.6rem !important"
  }
});

export default function Welcome() {
  const classes = useStyles();

  return (
    <Card className={classes.cardEmpty}>
      <CardContent>
        <figure className={classes.fig}>
          <img src={convivaLOGO} alt="" className={classes.im} />
        </figure>
        <Typography variant="h3" align="center" gutterBottom>
          Case Status Tracker
        </Typography>
        <Typography align="center" variant="body1" component="p">
          ...a <span style={{ fontWeight: "bold" }}>Live Link </span>to your
          case <br />
          helps you staying connected to your Case
        </Typography>
      </CardContent>
    </Card>
  );
}
