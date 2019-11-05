import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
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
    textTransform: "lowercase"
  }
}));

export default function TicketHelper({ errors }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* first letter */}
      <Fab
        size='small'
        variant='extended'
        disabled
        color='primary'
        className={classes.button}
      >
        {errors.letterT === undefined ? (
          <ClearIcon className={classes.clearIconStyles} />
        ) : errors.letterT ? (
          <DoneIcon className={classes.doneIconStyles} />
        ) : (
          <ClearIcon className={classes.clearIconStyles} />
        )}
        First character should be capital
        <span style={{ textTransform: "upperCase" }}> &nbsp; T</span>
      </Fab>
      {/* year */}
      <Fab
        size='small'
        variant='extended'
        disabled
        color='primary'
        className={classes.button}
      >
        {errors.year === undefined ? (
          <ClearIcon className={classes.clearIconStyles} />
        ) : errors.year ? (
          <DoneIcon className={classes.doneIconStyles} />
        ) : (
          <ClearIcon className={classes.clearIconStyles} />
        )}
        <span style={{ textTransform: "upperCase" }}>Y</span>ear. for ex: 2019
      </Fab>
      {/* month */}
      <Fab
        size='small'
        variant='extended'
        disabled
        color='primary'
        className={classes.button}
      >
        {errors.month === undefined ? (
          <ClearIcon className={classes.clearIconStyles} />
        ) : errors.month ? (
          <DoneIcon className={classes.doneIconStyles} />
        ) : (
          <ClearIcon className={classes.clearIconStyles} />
        )}
        <span style={{ textTransform: "upperCase" }}>M</span>onth. for ex: 12
      </Fab>
      {/* day */}
      <Fab
        size='small'
        variant='extended'
        disabled
        color='primary'
        className={classes.button}
      >
        {errors.day === undefined ? (
          <ClearIcon className={classes.clearIconStyles} />
        ) : errors.day ? (
          <DoneIcon className={classes.doneIconStyles} />
        ) : (
          <ClearIcon className={classes.clearIconStyles} />
        )}
        <span style={{ textTransform: "upperCase" }}>D</span>ay. for ex: 01
      </Fab>
      {/* Period after valid date */}
      <Fab
        size='small'
        variant='extended'
        disabled
        color='primary'
        className={classes.button}
      >
        {errors.period === undefined ? (
          <ClearIcon className={classes.clearIconStyles} />
        ) : errors.period ? (
          <DoneIcon className={classes.doneIconStyles} />
        ) : (
          <ClearIcon className={classes.clearIconStyles} />
        )}
        <span style={{ textTransform: "upperCase" }}>A &nbsp;</span>period after
        the date
      </Fab>
      {/* 4 last unique digits after period */}
      <Fab
        size='small'
        variant='extended'
        disabled
        color='primary'
        className={classes.button}
      >
        {errors.fourLastDigits === undefined ? (
          <ClearIcon className={classes.clearIconStyles} />
        ) : errors.fourLastDigits ? (
          <DoneIcon className={classes.doneIconStyles} />
        ) : (
          <ClearIcon className={classes.clearIconStyles} />
        )}
        Four last digits after the period.
      </Fab>
    </div>
  );
}
