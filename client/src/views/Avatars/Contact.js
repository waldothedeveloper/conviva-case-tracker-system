import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import waldo from "../../assets/waldo.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const useStyles = makeStyles(theme => ({
  rootList: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
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
      <List className={classes.rootList}>
        <ListItem>
          <ListItemText primary="For any questions/feedback please contact:" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.bigAvatar}>C</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Carlos Rodriguez"
            secondary="crodriguez@convivasolutions.com"
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.bigAvatar} src={waldo} />
          </ListItemAvatar>
          <ListItemText
            primary="Waldo Lavaut"
            secondary="wlavaut@convivasolutions.com"
          />
        </ListItem>
      </List>
    </div>
  );
}
