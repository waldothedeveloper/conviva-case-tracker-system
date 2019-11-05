import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TicketSearchCard from "./TicketSearchCard";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function TicketExpansionPanel({ input, loadSingleTicket }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography align='left' variant='h6' gutterBottom>
            Search ticket number
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TicketSearchCard input={input} loadSingleTicket={loadSingleTicket} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
