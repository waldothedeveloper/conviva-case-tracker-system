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
    // background: "",
    color: "#333 !important"
  },
  buttonOK: {
    textTransform: "lowercase",
    backgroundColor: "#CEE3E4 !important",
    color: "#333 !important"
  }
}));

export default function TicketHelper({ errors }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* first letter */}
      <Fab
        size="small"
        variant="extended"
        disabled
        className={`${
          errors.letterT !== undefined ? classes.buttonOK : classes.button
        }
        `}
      >
        {errors.letterT ? (
          <DoneIcon className={classes.doneIconStyles} />
        ) : null}
        Case starts with letter:
        <span style={{ textTransform: "upperCase" }}> &nbsp; T</span>
      </Fab>
      {/* year */}
      <Fab
        size="small"
        variant="extended"
        disabled
        className={`${
          errors.year !== undefined ? classes.buttonOK : classes.button
        }
        `}
      >
        {errors.year ? <DoneIcon className={classes.doneIconStyles} /> : null}
        <span style={{ textTransform: "upperCase" }}>Y</span>ear
      </Fab>
      {/* month */}
      <Fab
        size="small"
        variant="extended"
        disabled
        className={`${
          errors.month !== undefined ? classes.buttonOK : classes.button
        }
        `}
      >
        {errors.month ? <DoneIcon className={classes.doneIconStyles} /> : null}
        <span style={{ textTransform: "upperCase" }}>M</span>onth
      </Fab>
      {/* day */}
      <Fab
        size="small"
        variant="extended"
        disabled
        className={`${
          errors.day !== undefined ? classes.buttonOK : classes.button
        }
        `}
      >
        {errors.day ? <DoneIcon className={classes.doneIconStyles} /> : null}
        <span style={{ textTransform: "upperCase" }}>D</span>ay
      </Fab>
      {/* Period after valid date */}
      <Fab
        size="small"
        variant="extended"
        disabled
        className={`${
          errors.period !== undefined ? classes.buttonOK : classes.button
        }
        `}
      >
        {errors.period ? <DoneIcon className={classes.doneIconStyles} /> : null}
        <span style={{ textTransform: "upperCase" }}>P</span>eriod
      </Fab>
      {/* 4 last unique digits after period */}
      <Fab
        size="small"
        variant="extended"
        disabled
        className={`${
          errors.fourLastDigits !== undefined
            ? classes.buttonOK
            : classes.button
        }
        `}
      >
        {errors.fourLastDigits ? (
          <DoneIcon className={classes.doneIconStyles} />
        ) : null}
        4 last digits
      </Fab>
    </div>
  );
}
