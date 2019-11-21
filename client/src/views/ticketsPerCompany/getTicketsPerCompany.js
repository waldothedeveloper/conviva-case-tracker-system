import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const GET_TICKETS_BY_COMPANY = gql`
  query GET_TICKETS_BY_COMPANY($id: String!) {
    getTicketsByCompany(id: $id) {
      Title
      TicketNumber
      Description
      Status
      Priority
      AssignedResourceID
      CreateDate
      LastActivityDate
      LastActivityResourceID
      QueueID
      id
      UserDefinedFields
    }
  }
`;

export default function GetTicketsPerCompany(companyID) {
  const [
    getTickets,
    { called, loading, data, error }
  ] = useLazyQuery(GET_TICKETS_BY_COMPANY, { variables: { id: companyID.id } });
  return [{ called, loading, data, error }, getTickets];
}
