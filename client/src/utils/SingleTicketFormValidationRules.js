export default function Validate(values) {
  let errors = {};
  if (!values.ticketNumber) {
    errors.ticketNumber = "A ticket number is required!";
    errors.bool = true;
    console.log("A ticket number is required!");
  }

  if (values.ticketNumber && values.ticketNumber.length > 14) {
    errors.ticketNumber =
      "A ticket number cannot contain more than 14 characters!";
    errors.bool = true;
    console.log("A ticket number cannot contain more than 14 characters!");
  }

  return errors;
}
