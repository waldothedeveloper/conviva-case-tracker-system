import React from "react";
import TestRenderer from "react-test-renderer"; // ES6
import { MockedProvider } from "@apollo/react-testing";
import TicketsPerCompanyTable from "./TicketsPerCompanyTable";
import {
  GET_TICKETS_BY_COMPANY,
  GetTicketsPerCompany
} from "./getTicketsPerCompany";

const selectedCompanyID = {
  id: "190"
};

const mocks = [
  {
    request: {
      query: GET_TICKETS_BY_COMPANY,
      variables: {
        id: "190"
      }
    },
    result: {
      data: {
        getTicketsPerCompany: [
          {
            Title: "Mock Ticket 1",
            TicketNumber: null,
            Description: "I really need help with this shit",
            Status: "1",
            Priority: "1",
            AssignedResourceID: "123456",
            CreateDate: "2019",
            LastActivityDate: "2019",
            LastActivityResourceID: "2019",
            QueueID: "2",
            id: "1232554645"
          },
          {
            Title: "Mock Ticket 2",
            TicketNumber: "456",
            Description: "Now I need more help",
            Status: "2",
            Priority: "4",
            AssignedResourceID: "45342342",
            CreateDate: "2019",
            LastActivityDate: "2019",
            LastActivityResourceID: "2019",
            QueueID: "2",
            id: "1232554645"
          }
        ]
      }
    }
  }
];

it("renders without crashing", () => {
  const ticketsPerCompany = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TicketsPerCompanyTable selectedCompanyID={selectedCompanyID} />
    </MockedProvider>
  );

  const tree = ticketsPerCompany.toJSON();

  expect(tree).toMatchSnapshot();

  expect(tree[0].TicketNumber).toEqual("456");
});

// GetTicketsPerCompany(mocks[0].request.variables.id);
