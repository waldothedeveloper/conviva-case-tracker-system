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
    alignItems: "center",
    height: "90vh"
  },
  container1: {
    display: "flex"
  },
  container1FirstDiv: {
    width: "50%"
  },
  container1LastDiv: {
    alignItems: "flex-end",
    width: "50%",
    display: "flex",
    flexDirection: "column"
  },
  text: {
    fontWeight: "bold"
  },
  subtext: {
    color: "#567D96"
  }
});

export default function SingleTicketResults({ data, error, loading, called }) {
  const classes = useStyles();

  // this is to find the full name of technicians etc
  const findResource = (resourceID, typeOfResource) => {
    return data !== undefined
      ? typeOfResource.find(e => e.id === resourceID)
      : "";
  };

  // ERROR
  if (error) {
    return (
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
    );
  }

  // LOADING
  if (called && loading) {
    return <Spinner />;
  }

  // TICKET NOT FOUND
  if (
    data !== undefined &&
    data.getAutoTaskSingleTicket.TicketNumber === null
  ) {
    return (
      <Card className={classes.cardEmpty}>
        <CardContent>
          <Typography align='center' variant='h2' gutterBottom>
            CASE NOT FOUND
          </Typography>
          <Typography variant='body1' align='center' gutterBottom>
            The case might have one or more incorrect numbers. Please double
            check your case number
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // VALID TICKET
  if (
    data !== undefined &&
    data.getAutoTaskSingleTicket.TicketNumber !== null
  ) {
    return (
      <Card className={classes.card}>
        {/* case number */}
        <CardContent className={classes.container1}>
          <div className={classes.container1FirstDiv}>
            <Typography
              className={classes.subtext}
              color='textSecondary'
              variant='subtitle1'
            >
              Case Number
            </Typography>
            <Typography className={classes.text} variant='body1' gutterBottom>
              {data.getAutoTaskSingleTicket.TicketNumber}
            </Typography>
          </div>
          <div className={classes.container1LastDiv}>
            <Typography
              className={classes.subtext}
              color='textSecondary'
              variant='subtitle1'
            >
              Priority
            </Typography>
            <Typography className={classes.text} variant='body1' gutterBottom>
              {ticketPriority[data.getAutoTaskSingleTicket.Priority]}
            </Typography>
          </div>
        </CardContent>
        {/* title  */}
        <CardContent>
          <Typography
            className={classes.subtext}
            color='textSecondary'
            variant='subtitle1'
          >
            Title
          </Typography>
          <Typography variant='h5' className={classes.title} gutterBottom>
            {data.getAutoTaskSingleTicket.Title !== null
              ? data.getAutoTaskSingleTicket.Title
              : "No Title found"}
          </Typography>
        </CardContent>
        {/* status, resources, create-date, age, last activity time, last activity time */}
        <CardContent className={classes.container1}>
          <div className={classes.container1FirstDiv}>
            <Typography
              className={classes.subtext}
              color='textSecondary'
              variant='subtitle1'
            >
              Last Activity On
            </Typography>
            <Typography className={classes.text} variant='body1' gutterBottom>
              {new Date(
                data.getAutoTaskSingleTicket.LastActivityDate
              ).toLocaleDateString("en-US", options)}
            </Typography>

            <Typography
              className={classes.subtext}
              color='textSecondary'
              variant='subtitle1'
            >
              Status
            </Typography>
            <Typography className={classes.text} variant='body1' gutterBottom>
              {ticketStatus[data.getAutoTaskSingleTicket.Status]}
            </Typography>
            <Typography
              className={classes.subtext}
              color='textSecondary'
              variant='subtitle1'
            >
              Date Created
            </Typography>
            <Typography className={classes.text} variant='body1' gutterBottom>
              {new Date(
                data.getAutoTaskSingleTicket.CreateDate
              ).toLocaleDateString("en-US", options)}
            </Typography>
          </div>
          <div className={classes.container1LastDiv}>
            <Typography
              className={classes.subtext}
              color='textSecondary'
              variant='subtitle1'
            >
              By
            </Typography>
            <Typography className={classes.text} variant='body1' gutterBottom>
              {data.getAutoTaskSingleTicket.LastActivityResourceID === null
                ? "No Activity Assigned"
                : findResource(
                    data.getAutoTaskSingleTicket.LastActivityResourceID,
                    resources
                  ).resource_name}
            </Typography>
            <Typography
              className={classes.subtext}
              color='textSecondary'
              variant='subtitle1'
            >
              Age
            </Typography>
            <Typography className={classes.text} variant='body1' gutterBottom>
              {data.createDate === null
                ? ""
                : getTicketAge(data.getAutoTaskSingleTicket.CreateDate)}
            </Typography>
          </div>
        </CardContent>

        {/* technician */}
        <CardContent className={classes.container1}>
          <div className={classes.container1FirstDiv}>
            <Typography
              className={classes.subtext}
              color='textSecondary'
              variant='subtitle1'
            >
              Service Desk Contact
            </Typography>
            <Typography className={classes.text} variant='body1' gutterBottom>
              {data.getAutoTaskSingleTicket.AssignedResourceID === null
                ? "Not Assigned yet"
                : findResource(
                    data.getAutoTaskSingleTicket.AssignedResourceID,
                    resources
                  ).resource_name}
            </Typography>
          </div>
          <div className={classes.container1LastDiv}>
            <Typography
              className={classes.subtext}
              color='textSecondary'
              variant='subtitle1'
            >
              Queue
            </Typography>
            <Typography className={classes.text} variant='body1' gutterBottom>
              {data.getAutoTaskSingleTicket.QueueID === null
                ? "Queue not found"
                : findResource(data.getAutoTaskSingleTicket.QueueID, queues)
                    .resource_name}
            </Typography>
          </div>
        </CardContent>

        {/* Description */}
        <CardContent>
          <Typography
            className={classes.subtext}
            color='textSecondary'
            variant='subtitle1'
          >
            Description
          </Typography>
          <Typography className={classes.text} variant='body1' gutterBottom>
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
    );
  } else {
    return null;
  }
}
