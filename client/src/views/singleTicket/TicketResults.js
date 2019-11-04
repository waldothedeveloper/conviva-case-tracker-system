import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Spinner from "../../views/progress/Spinner";

import { ticketStatus } from "../../utils/ticketStatus";
import { ticketPriority } from "../../utils/ticketPriority";
import { resources } from "../../utils/resources";
import { queues } from "../../utils/queues";
import { getTicketAge } from "../../utils/getTicketAge";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {},
  pos: {
    marginBottom: 12
  }
});

export default function TicketResults({ data, error, loading, called }) {
  const classes = useStyles();
  console.log("Data:", data);

  // this is to find the full name of technicians etc
  const findResource = (resourceID, typeOfResource) => {
    return data !== undefined
      ? typeOfResource.find(e => e.id === resourceID)
      : "";
  };

  return (
    <React.Fragment>
      {error ? (
        <div>Something when wrong...</div>
      ) : called && loading ? (
        <Spinner />
      ) : data !== undefined && data.getAutoTaskSingleTicket ? (
        <Card className={classes.card}>
          {/* ticket number */}
          <CardContent>
            <Typography color='textSecondary' variant='caption'>
              Ticket Number
            </Typography>
            <Typography variant='body2' className={classes.title} gutterBottom>
              {data.getAutoTaskSingleTicket.TicketNumber}
            </Typography>
          </CardContent>
          {/* title & technician */}
          <CardContent>
            <Typography color='textSecondary' variant='subtitle2'>
              Title
            </Typography>
            <Typography variant='h5' className={classes.title} gutterBottom>
              {data.getAutoTaskSingleTicket.Title !== null
                ? data.getAutoTaskSingleTicket.Title
                : "No Title found"}
            </Typography>
            <Typography color='textSecondary' variant='subtitle2'>
              Service Desk Contact
            </Typography>
            <Typography variant='body1' gutterBottom>
              {data.getAutoTaskSingleTicket.AssignedResourceID === null
                ? "Not Assigned yet"
                : findResource(
                    data.getAutoTaskSingleTicket.AssignedResourceID,
                    resources
                  ).resource_name}
            </Typography>
          </CardContent>
          {/* Description */}
          <CardContent>
            <Typography color='textSecondary' variant='subtitle2'>
              Description
            </Typography>
            <Typography variant='body1' gutterBottom>
              {data.getAutoTaskSingleTicket.Description !== null
                ? data.getAutoTaskSingleTicket.Description.split("\n").map(
                    (item, key) => {
                      return (
                        <React.Fragment key={key}>
                          {item}
                          <br />
                        </React.Fragment>
                      );
                    }
                  )
                : "No description found"}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
