import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useForm from "../../containers/useForm";
import validate from "../../utils/SingleTicketFormValidationRules";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  formStyles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}));

export default function TicketSearchCard({ input, loadSingleTicket }) {
  const classes = useStyles();

  //this will be the callback function
  const sentCleanDataToServer = () => {
    console.log("Did i run");
    loadSingleTicket({ variables: { id: validTicket.ticketNumber } });
  };

  const { validTicket, errors, handleChange, handleSubmit } = useForm(
    sentCleanDataToServer,
    validate
  );

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography align='left' variant='h5' gutterBottom>
          Search ticket
        </Typography>

        <form onSubmit={handleSubmit} className={classes.formStyles}>
          <TextField
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
