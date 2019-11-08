import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import useForm from "../../containers/useForm";
import validate from "../../utils/SingleTicketFormValidationRules";
import TicketHelper from "./TicketHelper";
import SearchIcon from "@material-ui/icons/Search";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    boxShadow: "none"
  },
  textField: {
    margin: 0
  },
  formStyles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
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

export default function TicketSearchCard({
  input,
  loadSingleTicket,
  setSearchSingleTicket,
  setSearchTicketsPerCompany
}) {
  const classes = useStyles();

  //submit correct ticket if no errors
  const sentCleanDataToServer = () => {
    loadSingleTicket({ variables: { id: validTicket.ticketNumber } });
  };

  const { validTicket, errors, handleChange, handleSubmit } = useForm(
    sentCleanDataToServer,
    validate,
    setSearchSingleTicket,
    setSearchTicketsPerCompany
  );

  // To change the color of the input search
  React.useEffect(() => {
    const input = document.getElementsByClassName("MuiInputBase-input");
    input[0].style.background = "#F3F1ED";
  }, []);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='body2' gutterBottom>
          A ticket number has the following structure: <br />
          T-year-month-day-period-four-Numbers
        </Typography>
        <form onSubmit={handleSubmit} className={classes.formStyles}>
          <FormControl className={classes.textField} variant='outlined'>
            <OutlinedInput
              required={true}
              autoFocus={true}
              id='search-case'
              name='ticketNumber'
              type='text'
              error={errors.bool && true}
              inputProps={{ maxLength: 15 }}
              value={validTicket.ticketNumber || ""}
              onChange={handleChange}
              inputRef={node => {
                input = node;
              }}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='start-search-case'
                    type='submit'
                    // onMouseDown={handleSubmit}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <FormHelperText id='standard-weight-helper-text'>
              {errors.bool ? errors.ticketNumber : ""}
            </FormHelperText>
          </FormControl>

          <TicketHelper errors={errors} />
        </form>
      </CardContent>
    </Card>
  );
}
