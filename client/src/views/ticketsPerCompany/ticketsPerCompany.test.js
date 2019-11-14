import React from "react";
import TestRenderer from "react-test-renderer"; // ES6
import { MockedProvider } from "@apollo/react-testing";
import TicketsPerCompanyTable from "./TicketsPerCompanyTable";
import {
  GET_TICKETS_BY_COMPANY,
  GetTicketsPerCompany
} from "./getTicketsPerCompany";

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
            Title: "Mock Ticket HELP",
            TicketNumber: "123",
            Description: "I really need help with this shit",
            Status: "1",
            Priority: "1",
            AssignedResourceID: "123456",
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

it("renders an array of tickets per company", () => {
  TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TicketsPerCompanyTable />
    </MockedProvider>
  );
});

// GetTicketsPerCompany(mocks[0].request.variables.id);
