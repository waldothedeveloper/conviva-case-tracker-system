import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import TicketSearchCard from "./views/singleTicket/TicketSearchCard";
import TicketResults from "./views/singleTicket/TicketResults";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { CheckInternetConnection } from "./utils/checkInternet";
import Typography from "@material-ui/core/Typography";
import TicketExpansionPanel from "./views/singleTicket/TicketExpansionPanel";

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
    padding: "2% 0",
    margin: "0 auto",
    justifyContent: "center"
  },
  gridItems: {
    padding: "1%"
  },
  offline: {
    padding: "2% 5% 2% 5%",
    margin: "0 auto",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
}));

const App = () => {
  const isOnline = CheckInternetConnection();
  const classes = useStyles();
  let input;

  const [loadSingleTicket, { called, loading, data, error }] = useLazyQuery(
    GET_SINGLE_TICKET,
    { variables: { id: input } }
  );

  return (
    <React.Fragment>
      {isOnline ? (
        <Grid container className={classes.root}>
          <Grid
            className={classes.gridItems}
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >
            <TicketExpansionPanel
              input={input}
              loadSingleTicket={loadSingleTicket}
            />
          </Grid>
          <Grid
            className={classes.gridItems}
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
          >
            <TicketResults
              called={called}
              loading={loading}
              data={data}
              error={error}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.offline}>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
            <Typography align='center' variant='h1' gutterBottom>
              :( <br />
              <br />
              It seems like you're offline
            </Typography>
            <Typography align='center' variant='h4'>
              Please check your internet connection
            </Typography>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default App;
