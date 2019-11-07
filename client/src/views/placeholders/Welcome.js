import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    padding: "1.6%"
  },
  cardEmpty: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh"
  }
});

export default function Welcome() {
  const classes = useStyles();

  return (
    <Card className={classes.cardEmpty}>
      <CardContent>
        <Typography variant='h2' align='center' gutterBottom>
          {/* Welcome to the Service Desk Request */}
          Welcome to <br />
          Conviva Service Desk Request Tool
        </Typography>
        <Typography align='center' variant='h6' component='p'>
          This tool will allow you to check the status update of a submitted
          ticket.
        </Typography>
      </CardContent>
    </Card>
  );
}