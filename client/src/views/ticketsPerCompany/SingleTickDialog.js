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
import FindResource from "../../containers/FindSingleResource";
import { queues } from "../../utils/queues";
import { getTicketAge } from "../../utils/getTicketAge";
import { options } from "../../utils/options";
import ContactAvatars from "../Avatars/ContactAvatars";

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
    color: "#9DC8C9"
  },
  button: {
    transition: "background .300s ease-in-out",
    background: "#567D96",
    color: "#FFF",
    "&:hover": {
      background: "#FB7B56 !important",
      color: "#FFF"
    }
  },
  dialogAct: {
    padding: 16
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

  console.log("selectedTicket", selectedTicket);

  const findResource = (resourceID, typeOfResource) => {
    return typeOfResource.find(e => e.id === resourceID) || "";
  };

  if (selectedTicket.length > 0) {
    return (
      <div>
        <Dialog
          maxWidth="lg"
          fullWidth={true}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          scroll="paper"
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          id="single-ticket-dialog"
        >
          <DialogContent>
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
                <Typography
                  className={classes.text}
                  variant="body1"
                  gutterBottom
                >
                  {selectedTicket[0].TicketNumber}
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
                  {selectedTicket[0].Title}
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
                  <Typography
                    className={classes.text}
                    variant="body1"
                    gutterBottom
                  >
                    {ticketStatus(selectedTicket[0].Status)}
                  </Typography>
                  <Typography
                    style={{ marginTop: "1rem" }}
                    className={classes.subtext}
                    color="textSecondary"
                    variant="body1"
                  >
                    Last Activity On
                  </Typography>
                  <Typography
                    className={classes.text}
                    variant="body1"
                    gutterBottom
                  >
                    {new Date(
                      selectedTicket[0].LastActivityDate
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
                  <Typography
                    className={classes.text}
                    variant="body1"
                    gutterBottom
                  >
                    {ticketPriority(selectedTicket[0].Priority)}
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
                    resourceID={selectedTicket[0].LastActivityResourceID}
                  />
                </div>
              </CardContent>
              {/* , Notes */}
              {/* <CardContent>
                {data.getAutoTaskSingleTicket.UserDefinedFields !== null ? (
                  <Typography
                    className={classes.subtext}
                    color="textSecondary"
                    variant="body1"
                  >
                    Notes
                  </Typography>
                ) : null}
                <Typography
                  className={classes.text}
                  variant="body1"
                  gutterBottom
                >
                  {data.getAutoTaskSingleTicket.UserDefinedFields !== null
                    ? data.getAutoTaskSingleTicket.UserDefinedFields.split(
                        "\n"
                      ).map((item, key) => {
                        return (
                          <React.Fragment key={key}>
                            {item}
                            <br />
                          </React.Fragment>
                        );
                      })
                    : ""}
                </Typography>
              </CardContent> */}
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
                    resourceID={selectedTicket[0].AssignedResourceID}
                  />
                  <Typography
                    style={{ marginTop: "1rem" }}
                    className={classes.subtext}
                    color="textSecondary"
                    variant="body1"
                  >
                    Date Created
                  </Typography>
                  <Typography
                    className={classes.text}
                    variant="body1"
                    gutterBottom
                  >
                    {new Date(selectedTicket[0].CreateDate).toLocaleDateString(
                      "en-US",
                      options
                    )}
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
                  <Typography
                    className={classes.text}
                    variant="body1"
                    gutterBottom
                  >
                    {selectedTicket[0].QueueID === null
                      ? "Queue not found"
                      : findResource(selectedTicket[0].QueueID, queues)
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
                  <Typography
                    className={classes.text}
                    variant="body1"
                    gutterBottom
                  >
                    {selectedTicket[0].CreateDate === null
                      ? ""
                      : getTicketAge(selectedTicket[0].CreateDate)}
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
                <Typography
                  className={classes.text}
                  variant="body1"
                  gutterBottom
                >
                  {selectedTicket[0].Description !== undefined &&
                  selectedTicket[0].Description !== null
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
          </DialogContent>
          <DialogActions className={classes.dialogAct}>
            <Button
              size="large"
              onClick={handleClose}
              className={classes.button}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return null;
  }
}
