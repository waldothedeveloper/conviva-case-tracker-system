import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  button: {
    color: "#fff",
    margin: theme.spacing(1),
    "&:hover": {
      background: "#FB7B56 !important",
      color: "#FFF"
    }
  },
  pos: {
    marginBottom: 12
  },
  action: {
    display: "flex",
    flexDirection: "column"
  }
}));

export default function IE() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          align="center"
          variant="h4"
          color="textSecondary"
          gutterBottom
        >
          Sorry. <br />
          We do not support Internet Explorer
        </Typography>
        <Typography align="center" variant="body2" component="p">
          Please choose from the options below
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          className={classes.button}
          href="microsoft-edge:https://casetracker.mccigroup.com"
          rel="noreferrer"
          variant="contained"
          color="secondary"
          size="large"
        >
          Open in Microsoft Edge
        </Button>
        <Typography align="center" variant="body2" component="p">
          or copy and paste this link on Google Chrome:
        </Typography>
        <Link
          color="secondary"
          component="button"
          variant="body1"
          style={{ marginTop: "0.6rem" }}
        >
          {" "}
          https://casetracker.mccigroup.com
        </Link>
      </CardActions>
    </Card>
  );
}
