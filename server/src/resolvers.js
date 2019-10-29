const myJSON = require("./result.json");
const myTicketSamples = require("./ticketsSamples");

const resolvers = {
  Query: {
    getTicketSample: (_, args) => {
      return myTicketSamples.find(t => t.ticketNumber === args.id);
    },

    getSingleTicket: () =>
      myJSON["soap:Envelope"]["soap:Body"].queryResponse.queryResult
        .EntityResults.Entity
  }
};

module.exports = resolvers;
