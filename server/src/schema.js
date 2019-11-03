const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getAutoTaskSingleTicket(id: String!): Ticket!
    getTicketsByCompany(id: String!): Ticket!
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
`;

module.exports = typeDefs;
