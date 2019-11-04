import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { ticketStatus } from "../../utils/getTicketAge";
import { ticketPriority } from "../../utils/getTicketAge";
import { resources } from "../../utils/getTicketAge";
import { queues } from "../../utils/getTicketAge";
import { getTicketAge } from "../../utils/getTicketAge";

const GET_SINGLE_TICKET = gql`
  query GET_SINGLE_TICKET($id: String!) {
    getAutoTaskSingleTicket(id: $id) {
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
    }
  }
`;

let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  minute: "2-digit",
  hour: "numeric"
};

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

  // this is to find the full name of technicians etc
  const findResource = (resourceID, typeOfResource) => {
    return data !== undefined
      ? typeOfResource.find(e => e.id === resourceID)
      : "";
  };

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
        <br />
        <button type='submit'>Submit</button>
      </form>

      {data !== undefined && data.getAutoTaskSingleTicket && (
        <div>
          <h3>
            Title:{" "}
            {data.getAutoTaskSingleTicket.Title !== null
              ? data.getAutoTaskSingleTicket.Title
              : "No Title found"}
          </h3>
          <h4>
            Description:
            <br />
          </h4>
          <p>
            {data.getAutoTaskSingleTicket.Description !== null
              ? data.getAutoTaskSingleTicket.Description.split("\n").map(
                  (item, key) => {
                    return (
                      <React.Fragment key={key}>
                        {item}
                        <br />
                      </React.Fragment>
                    );
                  }
                )
              : "No description found"}
          </p>
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
            {data.getAutoTaskSingleTicket.AssignedResourceID === null
              ? "Not Assigned yet"
              : findResource(
                  data.getAutoTaskSingleTicket.AssignedResourceID,
                  resources
                ).resource_name}
          </h5>
          <h5>
            Date created:{" "}
            {new Date(
              data.getAutoTaskSingleTicket.CreateDate
            ).toLocaleDateString("en-US", options)}
          </h5>
          <h5>
            Last Activity Time:{" "}
            {new Date(
              data.getAutoTaskSingleTicket.LastActivityDate
            ).toLocaleDateString("en-US", options)}
          </h5>
          <h5>
            Last Activity By:{" "}
            {data.getAutoTaskSingleTicket.LastActivityResourceID === null
              ? "Not Activity Assigned"
              : findResource(
                  data.getAutoTaskSingleTicket.LastActivityResourceID,
                  resources
                ).resource_name}
          </h5>
          <h5>
            Queue:{" "}
            {data.getAutoTaskSingleTicket.QueueID === null
              ? "Queue not found"
              : findResource(data.getAutoTaskSingleTicket.QueueID, queues)
                  .resource_name}
          </h5>

          <h5>Ticket Age:</h5>
          <p>
            {data.createDate === null
              ? ""
              : getTicketAge(data.getAutoTaskSingleTicket.CreateDate)}{" "}
            days
          </p>
        </div>
      )}

      {data !== undefined &&
        data.getAutoTaskSingleTicket.TicketNumber === null && (
          <div style={{ margin: "4rem" }}>
            <h3> Ticket not found...please try again</h3>
          </div>
        )}
    </div>
  );
}

export default App;
