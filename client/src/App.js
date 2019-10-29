import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_SINGLE_TICKET = gql`
  query GET_SINGLE_TICKET($id: String!) {
    getTicketSample(id: $id) {
      ticketNumber
      title
      description
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

      {data !== undefined && data.getTicketSample !== null && (
        <div>
          <h3>Title: {data.getTicketSample.title}</h3>
          <h4>Description: {data.getTicketSample.description}</h4>
          <h5>Ticket Number: {data.getTicketSample.ticketNumber}</h5>
        </div>
      )}

      {data !== undefined && data.getTicketSample === null && (
        <div style={{ margin: "4rem" }}>
          <h3> Ticket not found...please try again</h3>
        </div>
      )}
    </div>
  );
}

export default App;
