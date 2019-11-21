const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getAutoTaskSingleTicket(id: String!): Ticket!
    getTicketsByCompany(id: String!): [Ticket]!
    getListOfCompanies: [Company]!
    getSingleTicketNotes(id: Int!): [TicketNotes]!
    getAllResources: [Resource]!
  }

  type Resource {
    FirstName: String
    LastName: String
    id: Int
  }

  type TicketNotes {
    title: String
    lastActivityDate: String
    assignedTo: String
    description: String
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
    UserDefinedFields: String
  }

  type Company {
    id: String
    name: String
    city: String
  }
`;

module.exports = typeDefs;
