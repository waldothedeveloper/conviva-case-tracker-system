const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getAutoTaskSingleTicket(id: String!): Ticket!
    getTicketsByCompany(id: String!): [ArrayOfTickets]!
    getListOfCompanies: [Company]!
  }

  type ArrayOfTickets {
    elements: [SingleTicketPerCompany]
  }

  type SingleTicketPerCompany {
    name: String
    elements: [SingleTicketsPerCompanyDetail]
  }

  type SingleTicketsPerCompanyDetail {
    text: String
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
  }

  type Company {
    id: String
    name: String
    city: String
  }
`;

module.exports = typeDefs;
