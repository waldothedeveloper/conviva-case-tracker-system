import React from "react";
import useAllResources from "./useAllResources";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinearSpinner from "../views/progress/LinearSpinner";

// arrayOfResources.find(e => e.id === resourceID)
const useStyles = makeStyles({
  text: {
    fontWeight: "bold"
  }
});

// this is to find the full name of technicians etc
export default function FindResource({ resourceID }) {
  // console.log("resourceID: ", resourceID);
  const [singleResourceFound, setSingleResourceFound] = React.useState(
    "Resource Not Found"
  );
  // console.log("singleResourceFound", singleResourceFound);
  const classes = useStyles();

  const [
    { called, loading, data, error },
    loadAllResources
  ] = useAllResources();

  React.useEffect(() => {
    loadAllResources();
  }, [loadAllResources]);

  // console.log("all resources", data);

  React.useEffect(() => {
    if (data !== undefined && data.getAllResources) {
      setSingleResourceFound(
        data.getAllResources.find(r => r.id === resourceID)
      );
    }
  }, [data, resourceID]);

  if (called && loading) {
    return <LinearSpinner />;
  }

  if (error) {
    return (
      <Typography className={classes.text} variant="body1" gutterBottom>
        Could not retrieve the resource
      </Typography>
    );
  }

  if (singleResourceFound !== undefined) {
    return (
      <Typography className={classes.text} variant="body1" gutterBottom>
        {`${singleResourceFound.FirstName} ${singleResourceFound.LastName}`}
      </Typography>
    );
  } else {
    return (
      <Typography className={classes.text} variant="body1" gutterBottom>
        Not Assigned
      </Typography>
    );
  }
}
