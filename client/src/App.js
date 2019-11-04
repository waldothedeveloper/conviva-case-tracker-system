import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TicketSearchCard from "./views/singleTicket/TicketSearchCard";
import TicketResults from "./views/singleTicket/TicketResults";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_SINGLE_TICKET = gql`
  query GET_SINGLE_TICKET($id: String!) {
    getAutoTaskSingleTicket(id: $id) {
      Title
      TicketNumber
      Description
      Status
      Priority
      AssignedResourceID
      CreateDate
      LastActivityDate
      LastActivityResourceID
      QueueID
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    margin: "0 auto",
    justifyContent: "center",
    alignContent: "center"
  }
}));

const App = () => {
  const classes = useStyles();
  let input;

  const [loadSingleTicket, { called, loading, data, error }] = useLazyQuery(
    GET_SINGLE_TICKET,
    { variables: { id: input } }
  );

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <TicketSearchCard input={input} loadSingleTicket={loadSingleTicket} />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <TicketResults
          called={called}
          loading={loading}
          data={data}
          error={error}
        />
      </Grid>
    </Grid>
  );
};

export default App;
