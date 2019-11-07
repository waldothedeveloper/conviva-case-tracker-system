import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import Fuse from "fuse.js";
import CentersList from "./CentersList";
import Spinner from "../progress/Spinner";

const useStyles = makeStyles(theme => ({
  formStyles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  textField: {
    margin: " 0 0 16px 0"
  },
  button: {
    transition: "background .300s ease-in-out",
    background: "#BAD8D9",
    "&:hover": {
      background: "#567D96 !important",
      color: "#fff"
    }
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
  setSearchSingleTicket
}) {
  const classes = useStyles();
  const [center, setCenter] = React.useState("");
  const [searchedCenter, setSearchedCenter] = React.useState([]);
  console.log("searchedCenter: ", searchedCenter);

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleChange = event => {
    setCenter(event.target.value);
  };

  //defined the fuse search!
  const fuse = data !== undefined && new Fuse(data.getListOfCompanies, options);

  // Search only if there's stored data available
  React.useEffect(() => {
    if (center.length !== 0 && data !== undefined) {
      setSearchedCenter(fuse.search(center));
    }
  }, [center, data]);

  // To change the color of the input search
  React.useEffect(() => {
    const input = document.getElementsByClassName("MuiInputBase-input");
    input[1].style.background = "#F3F1ED";
  }, []);

  return (
    <React.Fragment>
      <Typography variant='body2' gutterBottom>
        Type the name of any of the Conviva Centers
      </Typography>
      <form onSubmit={handleSubmit} className={classes.formStyles}>
        <TextField
          onChange={handleChange}
          value={center}
          className={classes.textField}
          error={false}
          placeholder='Search...'
          helperText={""}
          margin='normal'
          variant='outlined'
          name='company'
        />
        {loading && called ? (
          <Spinner />
        ) : error ? (
          <div>
            <Typography variant='body1' gutterBottom>
              We could not retrieve the center information.Please check back
              later
            </Typography>
          </div>
        ) : (
          <CentersList
            setSearchSingleTicket={setSearchSingleTicket}
            setSearchTicketsPerCompany={setSearchTicketsPerCompany}
            data={data}
            center={center}
            searchedCenter={searchedCenter}
          />
        )}

        {/* <Button
          size='large'
          type='submit'
          variant='contained'
          color='primary'
          className={classes.button}
        >
          Submit
        </Button> */}
      </form>
    </React.Fragment>
  );
}
