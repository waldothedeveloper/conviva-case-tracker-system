const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getAutoTaskSingleTicket(id: String!): Ticket!
  }

  type Ticket {
    Description: String
    TicketNumber: String
    Title: String
  }
`;

module.exports = typeDefs;
