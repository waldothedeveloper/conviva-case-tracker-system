import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import waldo from "../../assets/waldo.jpg";

const useStyles = makeStyles(theme => ({
  rootList: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex"
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  contact1: {
    justifyContent: "flex-start"
  },
  contact2: {
    justifyContent: "flex-end"
  },
  contactText: {
    flex: "initial"
  }
}));

export default function ContactAvatars() {
  const classes = useStyles();

  return (
    <List className={classes.rootList}>
      <ListItem className={classes.contact1}>
        <ListItemAvatar>
          <Avatar className={classes.bigAvatar}>C</Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{
            root: classes.contactText
          }}
          primary="Carlos Rodriguez"
          secondary="crodriguez@convivasolutions.com"
        />
      </ListItem>
      <ListItem className={classes.contact2}>
        <ListItemAvatar>
          <Avatar className={classes.bigAvatar} src={waldo} />
        </ListItemAvatar>
        <ListItemText
          classes={{
            root: classes.contactText
          }}
          primary="Waldo Lavaut"
          secondary="wlavaut@convivasolutions.com"
        />
      </ListItem>
    </List>
  );
}
