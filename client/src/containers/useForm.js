import React from "react";

export default function useForm(
  callback,
  validate,
  setSearchSingleTicket,
  setSearchTicketsPerCompany
) {
  const [validTicket, setValidTicket] = React.useState("");
  // console.log("validTicket: ", validTicket);
  // console.log("form data: ", validTicket);
  const [errors, setErrors] = React.useState({});
  // console.log("errors: ", errors);

  //whenever the user types please validate input
  React.useEffect(() => {
    if (validTicket) {
      setErrors(validate(validTicket));
    }
  }, [validTicket, validate]);

  const handleSubmit = event => {
    if (event) event.preventDefault();

    setErrors(validate(validTicket));

    if (!errors.bool) {
      setSearchTicketsPerCompany(false);
      setSearchSingleTicket(true);
      callback();
    }
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
