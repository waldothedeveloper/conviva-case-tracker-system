// const ticketRegex = /(?:T\d{4}[0-12]{2}[0-31]{2}\.\d{4})/;

let letterT = /^T/;
let year = /^\d{4}$/;
let month = /^(0?[1-9]|1[012])$/;
let day = /(0[1-9]|[12]\d|3[01])/;
let fourLastDigits = /^\d{4}$/;

export default function Validate(values) {
  let errors = {};
  // let capitalizedValues;

  // if (values.ticketNumber) {
  //   capitalizedValues = values.ticketNumber.toUpperCase();
  // }

  // Check if it is empty
  if (!values.ticketNumber) {
    errors.bool = true;
    errors.ticketNumber = "A ticket number cannot be empty";
  }

  //check first letter should be capital T
  if (values.ticketNumber && letterT.test(values.ticketNumber[0])) {
    errors.letterT = true;
  } else {
    errors.bool = true;
  }

  //check year
  if (values.ticketNumber && year.test(values.ticketNumber.slice(1, 5))) {
    errors.year = true;
  } else {
    errors.bool = true;
  }

  // check month
  if (values.ticketNumber && month.test(values.ticketNumber.slice(5, 7))) {
    errors.month = true;
  } else {
    errors.bool = true;
  }

  // check day
  if (values.ticketNumber && day.test(values.ticketNumber.slice(7, 9))) {
    errors.day = true;
  } else {
    errors.bool = true;
  }

  // check period after valid date
  if (values.ticketNumber && values.ticketNumber.slice(9, 10) === ".") {
    errors.period = true;
  } else {
    errors.bool = true;
  }

  // check four last digits after period
  if (
    values.ticketNumber &&
    fourLastDigits.test(values.ticketNumber.slice(10, 14))
  ) {
    errors.fourLastDigits = true;
  } else {
    errors.bool = true;
  }

  //If it does not match the regex dont allow submit
  // if (!ticketRegex.test(values.ticketNumber.toUpperCase())) {
  //   errors.ticketNumber = "Incorrect ticket format...please follow guides";
  //   errors.bool = true;
  //   console.log("Incorrect ticket format...please follow guides");
  // }

  //If the length is greater than 14 chars don't allow submit
  if (values.ticketNumber && values.ticketNumber.length > 14) {
    errors.ticketNumber =
      "A ticket number cannot contain more than 14 characters!";
    errors.bool = true;
    console.log("A ticket number cannot contain more than 14 characters!");
  }

  return errors;
}
