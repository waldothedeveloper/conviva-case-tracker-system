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
import { options } from "../../utils/options";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    padding: "1.6%"
  },
  cardEmpty: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  container1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  container1LastDiv: {
    width: "16%"
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
        <Card className={classes.cardEmpty}>
          <CardContent>
            <Typography
              variant='h2'
              align='center'
              color='textSecondary'
              gutterBottom
            >
              ERROR
            </Typography>
            <Typography align='center' variant='h6' component='p'>
              Oh no...what happened? <br />
              Try again in a little bit
            </Typography>
          </CardContent>
        </Card>
      ) : called && loading ? (
        <Spinner />
      ) : data !== undefined &&
        data.getAutoTaskSingleTicket.TicketNumber &&
        data.getAutoTaskSingleTicket.TicketNumber !== null ? (
        <Card className={classes.card}>
          {/* ticket number */}
          <CardContent className={classes.container1}>
            <div>
              <Typography color='textSecondary' variant='subtitle1'>
                Ticket Number
              </Typography>
              <Typography variant='body1' gutterBottom>
                {data.getAutoTaskSingleTicket.TicketNumber}
              </Typography>
            </div>
            <div className={classes.container1LastDiv}>
              <Typography color='textSecondary' variant='subtitle1'>
                Priority
              </Typography>
              <Typography variant='body1' gutterBottom>
                {ticketPriority[data.getAutoTaskSingleTicket.Priority]}
              </Typography>
            </div>
          </CardContent>
          {/* technician */}
          <CardContent className={classes.container1}>
            <div>
              <Typography color='textSecondary' variant='subtitle1'>
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
            </div>
            <div className={classes.container1LastDiv}>
              <Typography color='textSecondary' variant='subtitle1'>
                Queue
              </Typography>
              <Typography variant='body1' gutterBottom>
                {data.getAutoTaskSingleTicket.QueueID === null
                  ? "Queue not found"
                  : findResource(data.getAutoTaskSingleTicket.QueueID, queues)
                      .resource_name}
              </Typography>
            </div>
          </CardContent>
          {/* title  */}
          <CardContent>
            <Typography color='textSecondary' variant='subtitle1'>
              Title
            </Typography>
            <Typography variant='h4' className={classes.title} gutterBottom>
              {data.getAutoTaskSingleTicket.Title !== null
                ? data.getAutoTaskSingleTicket.Title
                : "No Title found"}
            </Typography>
          </CardContent>
          {/* status, resources, create-date, age, last activity time, last activity time */}
          <CardContent className={classes.container1}>
            <div>
              <Typography color='textSecondary' variant='subtitle1'>
                Ticket Status
              </Typography>
              <Typography variant='body1' gutterBottom>
                {ticketStatus[data.getAutoTaskSingleTicket.Status]}
              </Typography>
              <Typography color='textSecondary' variant='subtitle1'>
                Date Created
              </Typography>
              <Typography variant='body1' gutterBottom>
                {new Date(
                  data.getAutoTaskSingleTicket.CreateDate
                ).toLocaleDateString("en-US", options)}
              </Typography>
              <Typography color='textSecondary' variant='subtitle1'>
                Last Activity Time
              </Typography>
              <Typography variant='body1' gutterBottom>
                {new Date(
                  data.getAutoTaskSingleTicket.LastActivityDate
                ).toLocaleDateString("en-US", options)}
              </Typography>
            </div>
            <div className={classes.container1LastDiv}>
              <Typography color='textSecondary' variant='subtitle1'>
                Resources
              </Typography>
              <Typography variant='body1' gutterBottom>
                Other technicians...
              </Typography>
              <Typography color='textSecondary' variant='subtitle1'>
                Ticket Age
              </Typography>
              <Typography variant='body1' gutterBottom>
                {data.createDate === null
                  ? ""
                  : getTicketAge(data.getAutoTaskSingleTicket.CreateDate)}{" "}
                days
              </Typography>
              <Typography color='textSecondary' variant='subtitle1'>
                Last Activity By
              </Typography>
              <Typography variant='body1' gutterBottom>
                {data.getAutoTaskSingleTicket.LastActivityResourceID === null
                  ? "Not Activity Assigned"
                  : findResource(
                      data.getAutoTaskSingleTicket.LastActivityResourceID,
                      resources
                    ).resource_name}
              </Typography>
            </div>
          </CardContent>
          {/* Description */}
          <CardContent>
            <Typography color='textSecondary' variant='subtitle1'>
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
      ) : data !== undefined &&
        data.getAutoTaskSingleTicket.TicketNumber === null ? (
        <Card className={classes.cardEmpty}>
          <CardContent>
            <Typography
              align='center'
              variant='h2'
              color='textSecondary'
              gutterBottom
            >
              TICKET NOT FOUND
            </Typography>
            <Typography variant='body1' align='center' gutterBottom>
              The ticket might have one or more incorrect numbers. Please double
              check your ticket number
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card className={classes.cardEmpty}>
          <CardContent>
            <Typography
              variant='h2'
              align='center'
              color='textSecondary'
              gutterBottom
            >
              Tips for searching
            </Typography>
            <Typography align='center' variant='h6' component='p'>
              A ticket has the following convention: <br />
              T-year-month-day.xxxx
            </Typography>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
}
