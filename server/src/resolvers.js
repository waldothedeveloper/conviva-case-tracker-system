const CleanDataAndReturnTicketObject = require("./utils/helpers");
const url = "https://webservices14.autotask.net/atservices/1.6/atws.asmx";
const SOAPTicketHelper = require("./datasources/autotaskAPI");
const convert = require("xml-js");
const fetch = require("node-fetch");

const resolvers = {
  Query: {
    getAutoTaskSingleTicket: async (_, args) => {
      try {
        const response = await fetch(url, SOAPTicketHelper(args.id));
        const thisIsJustAnXMLString = await response.text();
        const toJSONString = convert.xml2json(thisIsJustAnXMLString);
        // console.log("toJSONString: ", JSON.stringify(toJSONString));

        const JSONobj = JSON.parse(toJSONString);
        // this will return the new object constructed over there
        return CleanDataAndReturnTicketObject(JSONobj);
      } catch (error) {
        console.log("error in the server", error);
      }
    }
  }
};

module.exports = resolvers;
