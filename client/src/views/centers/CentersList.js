import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Spinner from "../progress/Spinner";

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: 450,
    overflow: "scroll",
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function FolderList({ data, loading, error, called }) {
  const classes = useStyles();
  console.log("data: ", data);

  if (error) {
    return <div>Something when wrong...Try again in a little bit</div>;
  }

  if (called && loading) {
    return <Spinner />;
  }

  if (data !== undefined && Array.isArray(data.getListOfCompanies)) {
    return (
      <React.Fragment>
        <List className={classes.root}>
          {data.getListOfCompanies.map(company => {
            return (
              <ListItem button key={company.id}>
                <ListItemText primary={company.name} secondary={company.city} />
              </ListItem>
            );
          })}
        </List>
      </React.Fragment>
    );
  } else {
    return null;
  }
}
