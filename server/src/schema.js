const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getSingleTicket: Entity!
    getTicketSample(id: String!): TicketSample
  }

  type TicketSample {
    ticketNumber: String
    title: String
    description: String
  }

  type TicketTitle {
    _text: String!
  }
  type TicketDescription {
    _text: String!
  }
  type TicketNumber {
    _text: String!
  }
  type Entity {
    Title: TicketTitle!
    Description: TicketDescription!
    TicketNumber: TicketNumber!
  }
`;

module.exports = typeDefs;
