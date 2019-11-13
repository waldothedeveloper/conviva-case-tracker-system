import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "../../css/centerList.css";

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: 450,
    overflow: "scroll",
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  cover: {
    marginBottom: "2rem",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: 0,
    border: 0,
    borderRadius: "0 0 24px 24px",
    // boxShadow: "0 2px 2px 0 rgba(32,33,36,0.28)",
    borderColor: "#9dc8c9",
    borderStyle: "solid",
    borderWidth: 1,
    paddingBottom: 4,
    overflow: "hidden"
  },
  list: {
    "&hover": {
      fontWeight: "bolder"
    }
  }
}));

export default function CenterList({
  searchedCenter,
  center,
  setSearchTicketsPerCompany,
  setSearchSingleTicket,
  setselectedCompanyID
}) {
  const classes = useStyles();

  function handleClick(id) {
    setSearchTicketsPerCompany(true);
    setSearchSingleTicket(false);
    setselectedCompanyID(searchedCenter[id]);
  }

  if (searchedCenter.length > 0) {
    return (
      <div className={classes.cover}>
        <List className={classes.root}>
          {searchedCenter.map((company, id) => {
            return (
              <ListItem
                button
                onClick={() => handleClick(id)}
                key={company.id}
                className={classes.list}
              >
                <ListItemText primary={company.name} secondary={company.city} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  } else if (searchedCenter.length === 0 && center.length !== 0) {
    return (
      <List className={classes.root}>
        <ListItem>
          <ListItemText primary="Your search did not match any documents. Make sure all words are spelled correctly." />
        </ListItem>
      </List>
    );
  } else {
    return null;
  }
}
