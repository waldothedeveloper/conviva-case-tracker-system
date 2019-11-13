import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Spinner from "../progress/Spinner";
import SingleTicketDialog from "./SingleTicketDialog";
import GetTicketsPerCompany from "./getTicketsPerCompany";
import { ticketStatus } from "../../utils/ticketStatus";
import { ticketPriority } from "../../utils/ticketPriority";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  empty: {
    width: "100%",
    overflowX: "auto",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  table: {
    minWidth: 650
  },
  mainRow: {
    fontSize: "1.2rem",
    color: "#FB7B56"
  }
});

export default function TicketsPerCompanyTable({ selectedCompanyID }) {
  const classes = useStyles();
  const [selectedTicket, setSelectedTicket] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const [{ called, loading, data, error }, getTickets] = GetTicketsPerCompany(
    selectedCompanyID
  );
  // console.log('data: ', data);

  const handleClickOpen = ticketNumber => {
    setOpen(true);
    const pickedTicket = data.getTicketsByCompany.filter(
      obj => obj.TicketNumber === ticketNumber
    );
    setSelectedTicket(pickedTicket);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (selectedCompanyID !== null) {
      getTickets({ variables: { id: selectedCompanyID.id } });
    }
  }, [getTickets, selectedCompanyID]);

  if (loading && called) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Paper className={classes.empty}>
        <Typography variant="h3" align="center" gutterBottom>
          Something went terribly wrong. Please come back later.
        </Typography>
      </Paper>
    );
  }

  if (data !== undefined && data.getTicketsByCompany.length === 0) {
    return (
      <Paper className={classes.empty}>
        <Typography variant="h2" align="center" gutterBottom>
          :(
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          No open cases found for this center
        </Typography>
      </Paper>
    );
  }

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.mainRow}>Case</TableCell>
              <TableCell className={classes.mainRow} align="right">
                Title
              </TableCell>
              <TableCell className={classes.mainRow} align="right">
                Company/Center
              </TableCell>
              <TableCell className={classes.mainRow} align="right">
                Status
              </TableCell>
              <TableCell className={classes.mainRow} align="right">
                Priority
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data !== undefined &&
              data.getTicketsByCompany.map((obj, idx) => {
                return (
                  <TableRow
                    hover
                    key={data.getTicketsByCompany[idx].TicketNumber}
                    onClick={() => handleClickOpen(obj.TicketNumber)}
                  >
                    <TableCell component="th" scope="row">
                      {obj.TicketNumber}
                    </TableCell>
                    <TableCell align="right">{obj.Title}</TableCell>
                    <TableCell align="right">
                      {selectedCompanyID.name !== undefined
                        ? selectedCompanyID.name
                        : ""}
                    </TableCell>
                    <TableCell align="right">
                      {ticketStatus(obj.Status)}
                    </TableCell>
                    <TableCell align="right">
                      {ticketPriority(obj.Priority)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
      <SingleTicketDialog
        selectedTicket={selectedTicket}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </React.Fragment>
  );
}
