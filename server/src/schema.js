const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getAutoTaskSingleTicket(id: String!): Ticket!
    getTicketsByCompany(id: String!): [ArrayOfTickets]!
    getListOfCompanies: [Company]!
    getSingleTicketNotes(id: Int!): [TicketNotes]!
  }

  type TicketNotes {
    title: String
    lastActivityDate: String
    assignedTo: String
    description: String
  }

  type ArrayOfTickets {
    title: String
    status: String
    ticketNumber: String
    priority: String
  }

  type Ticket {
    Description: String
    TicketNumber: String
    Title: String
    Status: Int
    Priority: Int
    AssignedResourceID: Int
    CreateDate: String
    LastActivityDate: String
    LastActivityResourceID: Int
    QueueID: Int
    id: Int
  }

  type Company {
    id: String
    name: String
    city: String
  }
`;

module.exports = typeDefs;
