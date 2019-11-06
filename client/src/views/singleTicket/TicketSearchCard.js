import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useForm from "../../containers/useForm";
import validate from "../../utils/SingleTicketFormValidationRules";
import TicketHelper from "./TicketHelper";

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

export default function TicketSearchCard({ input, loadSingleTicket }) {
  const classes = useStyles();

  //submit correct ticket if no errors
  const sentCleanDataToServer = () => {
    console.log("Did i run");
    loadSingleTicket({ variables: { id: validTicket.ticketNumber } });
  };

  const { validTicket, errors, handleChange, handleSubmit } = useForm(
    sentCleanDataToServer,
    validate
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
          <TextField
            inputProps={{ maxLength: 15 }}
            maxLength='14'
            onChange={handleChange}
            inputRef={node => {
              input = node;
            }}
            value={validTicket.ticketNumber || ""}
            className={classes.textField}
            error={errors.bool && true}
            placeholder='Search...'
            helperText={errors.bool ? errors.ticketNumber : ""}
            margin='normal'
            variant='outlined'
            name='ticketNumber'
          />

          <TicketHelper errors={errors} />
          <Button
            size='large'
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
