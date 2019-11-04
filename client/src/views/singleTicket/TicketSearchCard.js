import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    padding: "0 13% 0 13%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}));

export default function TicketSearchCard({ input, loadSingleTicket }) {
  const [ticketInput, setTicketInput] = React.useState("");
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    loadSingleTicket({ variables: { id: ticketInput } });
  };

  const handleChange = e => {
    setTicketInput(e.target.value);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography align='left' variant='h5' gutterBottom>
          Search ticket
        </Typography>
        <Typography align='left' variant='body2' component='p'>
          A ticket has the following convention: <br />
          T-year-month-day.xxxx (four unique numbers)
        </Typography>
        <form onSubmit={handleSubmit} className={classes.formStyle}>
          <TextField
            maxLength='14'
            onChange={handleChange}
            inputRef={node => {
              input = node;
            }}
            value={ticketInput}
            className={classes.textField}
            error={false}
            placeholder='Search...'
            helperText='helper text useful for errors'
            margin='normal'
            variant='outlined'
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
