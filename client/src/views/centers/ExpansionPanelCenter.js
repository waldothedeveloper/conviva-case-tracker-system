import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CentersList from "./CentersList";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_COMPANIES = gql`
  query {
    getListOfCompanies {
      id
      name
      city
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: "0 0 5% 0"
  }
}));

export default function ExpansionPanelCenter() {
  const classes = useStyles();
  const [loaded, setLoadedCompanies] = React.useState(false);

  const [loadCompanies, { called, loading, data, error }] = useLazyQuery(
    GET_COMPANIES
  );

  const handleClick = () => {
    setLoadedCompanies(!loaded);
  };

  React.useEffect(() => {
    if (loaded) {
      loadCompanies();
    }
  }, [loaded]);

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          onClick={handleClick}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography align='left' variant='h6' gutterBottom>
            Search tickets by center
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CentersList
            data={data}
            loading={loading}
            error={error}
            called={called}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
