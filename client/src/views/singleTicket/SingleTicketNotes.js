import React from "react";
import useTicketNotes from "../../containers/useTicketNotes";

export default function SingleTicketNotes({ singleTicketID }) {
  const [ticketID, setTicketID] = React.useState(0);
  console.log("ticketID: ", ticketID);
  const [
    { called, loading, data, error },
    loadSingleTicketNotes
  ] = useTicketNotes(ticketID);

  // console.log("ticketNotesData on SingleTicketNote", data);

  React.useEffect(() => {
    if (singleTicketID > 0) {
      setTicketID(singleTicketID);
    }
  }, [singleTicketID]);

  React.useEffect(() => {
    if (ticketID > 0) {
      loadSingleTicketNotes();
    }
  }, [loadSingleTicketNotes, ticketID]);

  return (
    <div style={{ color: "red" }}>I am the Single Ticket Notes Component</div>
  );
}
