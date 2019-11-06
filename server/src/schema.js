const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getAutoTaskSingleTicket(id: String!): Ticket!
    getTicketsByCompany(id: String!): Ticket!
    getListOfCompanies: [Company]!
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
    name: String
  }
`;

module.exports = typeDefs;
