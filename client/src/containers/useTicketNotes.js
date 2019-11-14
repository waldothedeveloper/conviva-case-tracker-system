import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_SINGLE_TICKET_NOTES = gql`
  query GET_SINGLE_TICKET_NOTES($id: Int!) {
    getSingleTicketNotes(id: $id) {
      title
      lastActivityDate
      assignedTo
      description
    }
  }
`;

export default function useTicketNotes(ticketID) {
  const [
    loadSingleTicketNotes,
    { called, loading, data, error }
  ] = useLazyQuery(GET_SINGLE_TICKET_NOTES, { variables: { id: ticketID } });

  return [
    {
      called,
      loading,
      data,
      error
    },
    loadSingleTicketNotes
  ];
}
