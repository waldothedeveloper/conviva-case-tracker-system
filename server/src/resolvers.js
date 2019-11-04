const CleanDataAndReturnTicketObject = require("./utils/helpers");
const url = "https://webservices14.autotask.net/atservices/1.6/atws.asmx";
const SOAPTicketHelper = require("./datasources/getSingleTicket");
const SOAPTicketsByCompanyHelper = require("./datasources/getTicketsByCompany");
const convert = require("xml-js");
const fetch = require("node-fetch");

const resolvers = {
  Query: {
    // get a Single ticket
    getAutoTaskSingleTicket: async (_, args) => {
      // console.log(args.id);
      try {
        const response = await fetch(url, SOAPTicketHelper(args.id));
        const thisIsJustAnXMLString = await response.text();
        const toJSONString = convert.xml2json(thisIsJustAnXMLString);
        // console.log("toJSONString: ", JSON.stringify(toJSONString));

        const JSONobj = JSON.parse(toJSONString);
        // console.log("JSONobj: ", JSON.stringify(JSONobj));
        // this will return the new object constructed over there
        return CleanDataAndReturnTicketObject(JSONobj);
      } catch (error) {
        console.log("error in the server", error);
      }
    },
    // get all tickets by company
    getTicketsByCompany: async (_, args) => {
      try {
        const response = await fetch(url, SOAPTicketsByCompanyHelper(args.id));
        const thisIsJustAnXMLString = await response.text();
        // console.log("thisIsJustAnXMLString: ", thisIsJustAnXMLString);
        const toJSONString = convert.xml2json(thisIsJustAnXMLString);
        // console.log("toJSONString: ", JSON.stringify(toJSONString));

        const JSONobj = JSON.parse(toJSONString);
        // console.log("JSONobj: ", JSON.stringify(JSONobj));
        // this will return the new object constructed over there
        return CleanDataAndReturnTicketObject(JSONobj);

        return "Testing";
      } catch (error) {
        console.log("error in the server", error);
      }
    }
  }
};

module.exports = resolvers;
