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

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  empty: {
    width: "100%",
    overflowX: "auto",
    minHeight: "80vh"
  },
  table: {
    minWidth: 650
  }
});

export default function TicketsPerCompanyTable({ ticketsByCompany }) {
  console.log("ticketsByCompany already on The Table: ", ticketsByCompany);
  const classes = useStyles();

  if (ticketsByCompany.length === 0) {
    return <Spinner />;
  }

  if (ticketsByCompany.error !== undefined && ticketsByCompany.error) {
    return <div>Something when wrong...please try again</div>;
  }

  if (
    ticketsByCompany.length > 0 &&
    ticketsByCompany[0].data.getTicketsByCompany.length === 0
  ) {
    return (
      <Paper className={classes.empty}>
        <Typography variant='h5' align='center' gutterBottom>
          No open tickets found for this center
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Ticket Number</TableCell>
            <TableCell align='right'>Title</TableCell>
            <TableCell align='right'>Company/Center</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'>Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ticketsByCompany.length > 0 &&
            ticketsByCompany[0].data.getTicketsByCompany.map((obj, idx) => {
              return (
                <TableRow hover selected={true} key={idx}>
                  <TableCell component='th' scope='row'>
                    {obj.ticketNumber}
                  </TableCell>
                  <TableCell align='right'>{obj.title}</TableCell>
                  <TableCell align='right'>
                    {ticketsByCompany[1].name}
                  </TableCell>
                  <TableCell align='right'>{obj.status}</TableCell>
                  <TableCell align='right'>{obj.priority}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Paper>
  );
}
