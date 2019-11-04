import React from "react";

export default function useForm(callback, validate) {
  const [validTicket, setValidTicket] = React.useState("");
  console.log("validTicket: ", validTicket);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // If there's no errors and the form has submitted
  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
    //eslint-disable-next-line
  }, [errors]);

  const handleSubmit = event => {
    if (event) event.preventDefault();

    setErrors(validate(validTicket));
    setIsSubmitting(true);
  };

  const handleChange = event => {
    event.persist();

    setValidTicket(tickets => ({
      ...tickets,
      [event.target.name]: event.target.value
    }));
  };

  return {
    validTicket,
    errors,
    handleChange,
    handleSubmit
  };
}
