import React from "react";

export default function useForm(callback, validate) {
  const [validTicket, setValidTicket] = React.useState("");
  // console.log("form data: ", validTicket);
  const [errors, setErrors] = React.useState({});
  // console.log("errors: ", errors);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // If there's no errors and the form has submitted
  React.useEffect(() => {
    if (!errors.bool && isSubmitting) {
      callback();
    }
    //eslint-disable-next-line
  }, [errors]);

  //whenever the user types please validate input
  React.useEffect(() => {
    if (validTicket.ticketNumber) {
      setErrors(validate(validTicket));
    }
  }, [validTicket, validate]);

  const handleSubmit = event => {
    if (event) event.preventDefault();

    setErrors(validate(validTicket));
    setIsSubmitting(true);
  };

  const handleChange = event => {
    event.persist();

    let cleanTicketNumber = event.target.value.replace(/\s+/g, "");

    setValidTicket(tickets => ({
      ...tickets,
      [event.target.name]: cleanTicketNumber
    }));
  };

  return {
    validTicket,
    errors,
    handleChange,
    handleSubmit
  };
}
