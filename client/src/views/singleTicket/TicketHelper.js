import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "1rem auto",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  clearIconStyles: {
    color: "red"
  },
  doneIconStyles: {
    color: "green"
  },
  button: {
    textTransform: "lowercase",
    background: "#EBF4F4 !important",
    color: "#333 !important"
  }
}));

export default function TicketHelper({ errors }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* first letter */}
      <Fab size='small' variant='extended' disabled className={classes.button}>
        {errors.letterT ? (
          <DoneIcon className={classes.doneIconStyles} />
        ) : null}
        First letter should be:
        <span style={{ textTransform: "upperCase" }}> &nbsp; T</span>
      </Fab>
      {/* year */}
      <Fab size='small' variant='extended' disabled className={classes.button}>
        {errors.year ? <DoneIcon className={classes.doneIconStyles} /> : null}
        <span style={{ textTransform: "upperCase" }}>Y</span>ear
      </Fab>
      {/* month */}
      <Fab size='small' variant='extended' disabled className={classes.button}>
        {errors.month ? <DoneIcon className={classes.doneIconStyles} /> : null}
        <span style={{ textTransform: "upperCase" }}>M</span>onth
      </Fab>
      {/* day */}
      <Fab size='small' variant='extended' disabled className={classes.button}>
        {errors.day ? <DoneIcon className={classes.doneIconStyles} /> : null}
        <span style={{ textTransform: "upperCase" }}>D</span>ay
      </Fab>
      {/* Period after valid date */}
      <Fab size='small' variant='extended' disabled className={classes.button}>
        {errors.period ? <DoneIcon className={classes.doneIconStyles} /> : null}
        <span style={{ textTransform: "upperCase" }}>A &nbsp;</span>period after
      </Fab>
      {/* 4 last unique digits after period */}
      <Fab size='small' variant='extended' disabled className={classes.button}>
        {errors.fourLastDigits ? (
          <DoneIcon className={classes.doneIconStyles} />
        ) : null}
        4 last digits
      </Fab>
    </div>
  );
}
