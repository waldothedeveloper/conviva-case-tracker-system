import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import waldo from "../../assets/waldo.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: "0 0 5% 0"
  },
  cont: {
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      flexWrap: "wrap"
    },
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap"
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  card: {
    minWidth: 275
  },
  link: {
    color: "#FFF",
    marginLeft: 12
  },
  avs: {
    display: "flex",
    flexDirection: "column"
  },
  insideAvs: {
    display: "flex",
    alignItems: "center"
  }
}));

export default function Contact() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>
        <CardContent style={{ marginTop: "2.2rem" }}>
          <Typography align="left" variant="body1" gutterBottom>
            For any questions/feedback please contact:
          </Typography>
        </CardContent>
        <CardContent>
          <Grid container className={classes.cont}>
            <Grid item className={classes.avs}>
              <Grid item className={classes.insideAvs}>
                <Avatar className={classes.bigAvatar}>C</Avatar>
                <Typography>Carlos Rodriguez</Typography>
              </Grid>
              <Link
                href="mailto:crodriguez@convivasolutions.com"
                className={classes.link}
              >
                crodriguez@convivasolutions.com
              </Link>
            </Grid>
            <Grid item className={classes.avs}>
              <Grid item className={classes.insideAvs}>
                <Avatar className={classes.bigAvatar} src={waldo} />
                <Typography>Waldo Lavaut</Typography>
              </Grid>
              <Link
                href="mailto:crodriguez@convivasolutions.com"
                className={classes.link}
              >
                wlavaut@convivasolutions.com
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
