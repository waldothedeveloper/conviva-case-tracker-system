import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Spinner from "../../views/progress/Spinner";
import { ticketStatus } from "../../utils/ticketStatus";
import { ticketPriority } from "../../utils/ticketPriority";
import FindResource from "../../containers/FindSingleResource";
import { queues } from "../../utils/queues";
import { getTicketAge } from "../../utils/getTicketAge";
import { options } from "../../utils/options";
import ContactAvatars from "../Avatars/ContactAvatars";

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
    color: "#9DC8C9"
  }
});

export default function SingleTicketResults({ data, error, loading, called }) {
  const classes = useStyles();

  console.log("Single Ticket", data);

  const findResource = (resourceID, typeOfResource) => {
    return typeOfResource.find(e => e.id === resourceID) || "";
  };

  // ERROR
  if (error) {
    return (
      <Card className={classes.cardEmpty}>
        <CardContent>
          <Typography align="center" variant="h4" component="p">
            Something went terribly wrong. <br />
            Please come back later.
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
          <Typography align="center" variant="h2" gutterBottom>
            Case not found
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Please double check your case number.
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
        {/* Case number */}
        <CardContent>
          <Typography
            className={classes.subtext}
            color="textSecondary"
            variant="body1"
          >
            Case
          </Typography>
          <Typography className={classes.text} variant="body1" gutterBottom>
            {data.getAutoTaskSingleTicket.TicketNumber}
          </Typography>
        </CardContent>
        {/* Title  */}
        <CardContent>
          <Typography
            className={classes.subtext}
            color="textSecondary"
            variant="body1"
          >
            Title
          </Typography>
          <Typography variant="h5" className={classes.title} gutterBottom>
            {data.getAutoTaskSingleTicket.Title !== null
              ? data.getAutoTaskSingleTicket.Title
              : "No Title found"}
          </Typography>
        </CardContent>
        {/* status and priority, Last Activity On, Last Activity By */}
        <CardContent className={classes.container1}>
          <div className={classes.container1FirstDiv}>
            <Typography
              className={classes.subtext}
              color="textSecondary"
              variant="body1"
            >
              Status
            </Typography>
            <Typography className={classes.text} variant="body1" gutterBottom>
              {ticketStatus(data.getAutoTaskSingleTicket.Status)}
            </Typography>
            <Typography
              style={{ marginTop: "1rem" }}
              className={classes.subtext}
              color="textSecondary"
              variant="body1"
            >
              Last Activity On
            </Typography>
            <Typography className={classes.text} variant="body1" gutterBottom>
              {new Date(
                data.getAutoTaskSingleTicket.LastActivityDate
              ).toLocaleDateString("en-US", options)}
            </Typography>
          </div>
          <div className={classes.container1LastDiv}>
            <Typography
              className={classes.subtext}
              color="textSecondary"
              variant="body1"
            >
              Priority
            </Typography>
            <Typography className={classes.text} variant="body1" gutterBottom>
              {ticketPriority(data.getAutoTaskSingleTicket.Priority)}
            </Typography>
            <Typography
              style={{ marginTop: "1rem" }}
              className={classes.subtext}
              color="textSecondary"
              variant="body1"
            >
              By
            </Typography>
            <FindResource
              resourceID={data.getAutoTaskSingleTicket.LastActivityResourceID}
            />
          </div>
        </CardContent>
        {/* , Notes */}
        <CardContent>
          {data.getAutoTaskSingleTicket.UserDefinedFields !== null ? (
            <Typography
              className={classes.subtext}
              color="textSecondary"
              variant="body1"
            >
              Notes
            </Typography>
          ) : null}
          <Typography className={classes.text} variant="body1" gutterBottom>
            {data.getAutoTaskSingleTicket.UserDefinedFields !== null
              ? data.getAutoTaskSingleTicket.UserDefinedFields.split("\n").map(
                  (item, key) => {
                    return (
                      <React.Fragment key={key}>
                        {item}
                        <br />
                      </React.Fragment>
                    );
                  }
                )
              : ""}
          </Typography>
        </CardContent>
        {/* Service Desk Contact, Queue */}
        <CardContent className={classes.container1}>
          <div className={classes.container1FirstDiv}>
            <Typography
              className={classes.subtext}
              color="textSecondary"
              variant="body1"
            >
              Service Desk Contact
            </Typography>

            <FindResource
              resourceID={data.getAutoTaskSingleTicket.AssignedResourceID}
            />
            <Typography
              style={{ marginTop: "1rem" }}
              className={classes.subtext}
              color="textSecondary"
              variant="body1"
            >
              Date Created
            </Typography>
            <Typography className={classes.text} variant="body1" gutterBottom>
              {new Date(
                data.getAutoTaskSingleTicket.CreateDate
              ).toLocaleDateString("en-US", options)}
            </Typography>
          </div>
          <div className={classes.container1LastDiv}>
            <Typography
              className={classes.subtext}
              color="textSecondary"
              variant="body1"
            >
              Queue
            </Typography>
            <Typography className={classes.text} variant="body1" gutterBottom>
              {data.getAutoTaskSingleTicket.QueueID === null
                ? "Queue not found"
                : findResource(data.getAutoTaskSingleTicket.QueueID, queues)
                    .resource_name}
            </Typography>
            <Typography
              style={{ marginTop: "1rem" }}
              className={classes.subtext}
              color="textSecondary"
              variant="body1"
            >
              Age
            </Typography>
            <Typography className={classes.text} variant="body1" gutterBottom>
              {data.createDate === null
                ? ""
                : getTicketAge(data.getAutoTaskSingleTicket.CreateDate)}
            </Typography>
          </div>
        </CardContent>
        {/* Description */}
        <CardContent>
          <Typography
            className={classes.subtext}
            color="textSecondary"
            variant="body1"
          >
            Description
          </Typography>
          <Typography className={classes.text} variant="body1" gutterBottom>
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

        {/* Contact CARLOS or WALDO */}
        <CardContent>
          <Typography
            className={classes.subtext}
            color="textSecondary"
            variant="body1"
          >
            For questions about a case please contact:
          </Typography>
          <ContactAvatars />
        </CardContent>
      </Card>
    );
  } else {
    return null;
  }
}
