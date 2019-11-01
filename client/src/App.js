import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { ticketStatus } from "./utils/helpers";
import { ticketPriority } from "./utils/helpers";
import { resources } from "./utils/helpers";

const GET_SINGLE_TICKET = gql`
  query GET_SINGLE_TICKET($id: String!) {
    getAutoTaskSingleTicket(id: $id) {
      Title
      TicketNumber
      Description
      Status
      Priority
      AssignedResourceID
    }
  }
`;

function App() {
  let input;
  const [loadSingleTicket, { called, loading, data, error }] = useLazyQuery(
    GET_SINGLE_TICKET,
    { variables: { id: input } }
  );
  console.log("data: ", data);

  if (called && loading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>...Something when wrong</div>;
  }
  const findResource =
    data !== undefined
      ? resources.find(
          e => e.id === data.getAutoTaskSingleTicket.AssignedResourceID
        )
      : "";

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          loadSingleTicket({ variables: { id: input.value } });
          input.value = "";
        }}
      >
        <p>Please enter a ticket number</p>
        <input
          placeholder='enter ticket number'
          ref={node => {
            input = node;
          }}
        />
        <button type='submit'>Submit</button>
      </form>

      {data === undefined && (
        <div style={{ margin: "4rem" }}>Please enter a ticket number</div>
      )}

      {data !== undefined &&
        data.getAutoTaskSingleTicket.Title !== null &&
        data.getAutoTaskSingleTicket.TicketNumber !== null &&
        data.getAutoTaskSingleTicket.Description !== null && (
          <div>
            <h3>Title: {data.getAutoTaskSingleTicket.Title}</h3>
            <h4>Description: {data.getAutoTaskSingleTicket.Description}</h4>
            <h5>Ticket Number: {data.getAutoTaskSingleTicket.TicketNumber}</h5>
            <h5>
              Ticket Status: {ticketStatus[data.getAutoTaskSingleTicket.Status]}
            </h5>
            <h5>
              Ticket Priority:{" "}
              {ticketPriority[data.getAutoTaskSingleTicket.Priority]}
            </h5>
            <h5>
              Service Desk Contact:{" "}
              {findResource.resource_name !== undefined
                ? findResource.resource_name
                : ""}
            </h5>
          </div>
        )}

      {data !== undefined &&
        data.getAutoTaskSingleTicket.Title === null &&
        data.getAutoTaskSingleTicket.TicketNumber === null &&
        data.getAutoTaskSingleTicket.Description === null && (
          <div style={{ margin: "4rem" }}>
            <h3> Ticket not found...please try again</h3>
          </div>
        )}
    </div>
  );
}

export default App;
