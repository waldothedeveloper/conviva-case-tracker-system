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
    width: "100%",
    margin: "0 0 5% 0"
  }
}));

export default function TicketExpansionPanel({
  input,
  loadSingleTicket,
  setSearchSingleTicket,
  setSearchTicketsPerCompany,
  ticketPanelOpen,
  companyPanelOpen,
  setTicketPanelOpen,
  setCompanyPanelOpen
}) {
  const classes = useStyles();

  const handleClick = () => {
    setTicketPanelOpen(!ticketPanelOpen);
    setCompanyPanelOpen(!companyPanelOpen);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={ticketPanelOpen}>
        <ExpansionPanelSummary
          onClick={handleClick}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography align='left' variant='h6' gutterBottom>
            Case status by number
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TicketSearchCard
            input={input}
            loadSingleTicket={loadSingleTicket}
            setSearchSingleTicket={setSearchSingleTicket}
            setSearchTicketsPerCompany={setSearchTicketsPerCompany}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
