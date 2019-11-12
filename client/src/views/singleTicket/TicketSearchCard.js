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
  searchRoot: {
    background: "#F3F1ED"
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

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='body2' gutterBottom>
          A case number has the following structure: <br />
          -letter T <br />
          -year <br />
          -month <br />
          -day <br />
          -a period <br />
          -four-Numbers
        </Typography>
        <form onSubmit={handleSubmit} className={classes.formStyles}>
          <FormControl className={classes.textField} variant='outlined'>
            <OutlinedInput
              className={classes.searchRoot}
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
                  <IconButton aria-label='start-search-case' type='submit'>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
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
