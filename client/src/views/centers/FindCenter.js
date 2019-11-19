import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fuse from "fuse.js";
import CentersList from "./CentersList";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import "../../css/findCenter.css";

const useStyles = makeStyles(theme => ({
  formStyles: {
    marginTop: "0.2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  searchRoot: {
    background: "#F3F1ED"
  }
}));

//Fuse options
const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name"]
};

export default function FindCenter({
  data,
  loading,
  error,
  called,
  setSearchTicketsPerCompany,
  setSearchSingleTicket,
  setselectedCompanyID,
  loadCompanies
}) {
  const classes = useStyles();
  const [center, setCenter] = React.useState("");
  const [searchedCenter, setSearchedCenter] = React.useState([]);
  // console.log("searchedCenter: ", searchedCenter);

  // console.log("data", data);

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleChange = event => {
    setCenter(event.target.value);
  };

  const handleClick = () => {
    setCenter("");
    setSearchedCenter([]);
  };

  //defined the fuse search!
  const fuse = data !== undefined && new Fuse(data.getListOfCompanies, options);

  React.useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  // Search only if there's stored data available
  React.useEffect(() => {
    if (center.length !== 0 && data !== undefined) {
      setSearchedCenter(fuse.search(center));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, data]);

  return (
    <React.Fragment>
      <Typography variant="body2" gutterBottom>
        Type center name
      </Typography>
      <form onSubmit={handleSubmit} className={classes.formStyles}>
        <OutlinedInput
          onChange={handleChange}
          value={center}
          className={classes.searchRoot}
          required={true}
          name="company"
          type="text"
          error={false}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="start-search-case" onClick={handleClick}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        {loading && called ? (
          <React.Fragment>
            <Typography
              align="center"
              variant="body1"
              gutterBottom
              style={{ marginTop: "2rem" }}
            >
              Loading centers...please wait
            </Typography>
          </React.Fragment>
        ) : error ? (
          <div>
            <Typography variant="body1" gutterBottom>
              We could not retrieve the centers information. <br />
              Please check back later
            </Typography>
          </div>
        ) : (
          <React.Fragment>
            <CentersList
              setselectedCompanyID={setselectedCompanyID}
              setSearchSingleTicket={setSearchSingleTicket}
              setSearchTicketsPerCompany={setSearchTicketsPerCompany}
              data={data}
              center={center}
              searchedCenter={searchedCenter}
            />
            {data !== undefined ? (
              <Typography
                className="done"
                align="center"
                variant="body1"
                gutterBottom
                style={{ marginTop: "2rem" }}
              >
                Done!
              </Typography>
            ) : (
              ""
            )}
          </React.Fragment>
        )}
      </form>
    </React.Fragment>
  );
}
