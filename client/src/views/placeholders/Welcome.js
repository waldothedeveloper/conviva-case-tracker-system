import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import infinite_heartbeat from "../../assets/infinite_heartbeat.png";

const useStyles = makeStyles({
  cardEmpty: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    backgroundImage: `url(${infinite_heartbeat})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
});

export default function Welcome() {
  const classes = useStyles();

  return (
    <Card className={classes.cardEmpty}>
      <CardContent>
        <Typography variant='h3' align='center' gutterBottom>
          {/* Welcome to the Service Desk Request */}
          Welcome to the <br />
          Conviva Case Status Tracker
        </Typography>
        <Typography align='center' variant='h6' component='p'>
          A beautiful slogan placed here
        </Typography>
      </CardContent>
    </Card>
  );
}
