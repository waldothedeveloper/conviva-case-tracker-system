import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { CheckInternetConnection } from "./utils/checkInternet";
import TicketExpansionPanel from "./views/singleTicket/TicketExpansionPanel";
import CompanyExpansionPanel from "./views/centers/CompanyExpansionPanel";
import SingleTicketResults from "./views/singleTicket/SingleTicketResults";
import Welcome from "./views/placeholders/Welcome";
import TicketsPerCompanyTable from "./views/ticketsPerCompany/TicketsPerCompanyTable";
import ShowTicketsPerCompanyPlacehoder from "./views/ticketsPerCompany/ShowTicketsPerCompanyPlaceholder";
import AppBar from "./views/offline/AppBar";
import OfflineMessage from "./views/offline/OfflineMessage";
import Contact from "./views/Avatars/Contact";

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
      id
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
    padding: "0.4%",
    margin: "-0.2% !important",
    height: "100vh"
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
  const [searchSingleTicket, setSearchSingleTicket] = React.useState(false);
  const [searchTicketsPerCompany, setSearchTicketsPerCompany] = React.useState(
    false
  );
  const [selectedCompanyID, setselectedCompanyID] = React.useState(null);
  // console.log('selectedCompanyID: ', selectedCompanyID);

  let input;

  const [ticketPanelOpen, setTicketPanelOpen] = React.useState(false);
  const [companyPanelOpen, setCompanyPanelOpen] = React.useState(true);

  const [
    loadSingleTicket,
    { called, loading, data, error }
  ] = useLazyQuery(GET_SINGLE_TICKET, { variables: { id: input } });

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
            <CompanyExpansionPanel
              companyPanelOpen={companyPanelOpen}
              setCompanyPanelOpen={setCompanyPanelOpen}
              setTicketPanelOpen={setTicketPanelOpen}
              ticketPanelOpen={ticketPanelOpen}
              setselectedCompanyID={setselectedCompanyID}
              setSearchSingleTicket={setSearchSingleTicket}
              setSearchTicketsPerCompany={setSearchTicketsPerCompany}
            />
            <TicketExpansionPanel
              companyPanelOpen={companyPanelOpen}
              setCompanyPanelOpen={setCompanyPanelOpen}
              setTicketPanelOpen={setTicketPanelOpen}
              ticketPanelOpen={ticketPanelOpen}
              setSearchTicketsPerCompany={setSearchTicketsPerCompany}
              setSearchSingleTicket={setSearchSingleTicket}
              input={input}
              loadSingleTicket={loadSingleTicket}
            />
            <Contact />
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
            {searchSingleTicket ? (
              <SingleTicketResults
                called={called}
                loading={loading}
                data={data}
                error={error}
              />
            ) : searchTicketsPerCompany ? (
              <ShowTicketsPerCompanyPlacehoder
                table={
                  <TicketsPerCompanyTable
                    selectedCompanyID={selectedCompanyID}
                  />
                }
              />
            ) : (
              <Welcome />
            )}
          </Grid>
        </Grid>
      ) : (
        <React.Fragment>
          <AppBar />
          <OfflineMessage />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default App;
