import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import { ticketStatus } from "../../utils/ticketStatus";
import { ticketPriority } from "../../utils/ticketPriority";
import { resources } from "../../utils/resources";
import { queues } from "../../utils/queues";
import { getTicketAge } from "../../utils/getTicketAge";
import { options } from "../../utils/options";
import Spinner from "../progress/Spinner"

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    boxShadow: "none"
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
  },
  button: {
    transition: "background .300s ease-in-out",
    background: "#BAD8D9",
    "&:hover": {
      background: "#567D96 !important",
      color: "#fff"
    }
  }
});



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SingleTicketDialog({
  open,
  handleClose,
  selectedTicket
}) {
  const classes = useStyles();

    // this is to find the full name of technicians etc
    const findResource = (resourceID, typeOfResource) => {
      return typeOfResource.find(e => e.id === resourceID) || "";
    };


  if(selectedTicket.length > 0) {
    return (
      <div>
        <Dialog
          maxWidth="lg"
          open={open}
          TransitionComponent={Transition}
          keepMounted
          scroll="paper"
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
         
          <DialogContent >
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
                {selectedTicket[0].TicketNumber}
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
                {ticketPriority[selectedTicket[0].Priority]}
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
              {selectedTicket[0].Title}
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
                  selectedTicket[0].LastActivityDate
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
                {ticketStatus[selectedTicket[0].Status]}
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
                  selectedTicket[0].CreateDate
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
                {selectedTicket[0].LastActivityResourceID === null
                  ? "-"
                  : findResource(
                    selectedTicket[0].LastActivityResourceID,
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
                {selectedTicket[0].CreateDate === null
                  ? ""
                  : getTicketAge(selectedTicket[0].CreateDate)}
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
                {selectedTicket[0].AssignedResourceID === null
                  ? "Not Assigned yet"
                  : findResource(
                    selectedTicket[0].AssignedResourceID,
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
                {selectedTicket[0].QueueID === null
                  ? "Queue not found"
                  : findResource(selectedTicket[0].QueueID, queues)
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
              {selectedTicket[0].Description !== undefined && selectedTicket[0].Description !== null
                ? selectedTicket[0].Description.split("\n").map(
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
        </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.button}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return <Spinner />
  }
}
