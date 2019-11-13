import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10
  },
  link: {
    margin: 0,
    color: "#FFF"
  },
  text: {
    fontWeight: "bold"
  },
  subtext: {
    color: "#9DC8C9"
  },
  contact: {
    display: "flex",
    alignItems: "center"
  },
  container1FirstDiv: {
    width: "50%"
  },
  container1LastDiv: {
    alignItems: "flex-end",
    width: "50%",
    display: "flex",
    flexDirection: "column"
  }
});

export default function ContactAvatars() {
  const classes = useStyles();

  return (
    <Grid container>
      <div className={classes.container1FirstDiv}>
        <Grid item className={classes.contact} style={{ marginLeft: "-12px" }}>
          <Avatar className={classes.bigAvatar}>C</Avatar>
          <Typography>Carlos Rodriguez</Typography>
        </Grid>
        <Link
          href="mailto:crodriguez@convivasolutions.com"
          className={classes.link}
        >
          crodriguez@convivasolutions.com
        </Link>
      </div>
      <div className={classes.container1LastDiv}>
        <Grid item className={classes.contact}>
          <Avatar className={classes.bigAvatar}>W</Avatar>
          <Typography>Waldo Lavaut</Typography>
        </Grid>
        <Link
          href="mailto:wlavaut@convivasolutions.com"
          className={classes.link}
        >
          wlavaut@convivasolutions.com
        </Link>
      </div>
    </Grid>
  );
}
