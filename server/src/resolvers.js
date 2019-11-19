const CleanDataAndReturnTicketObject = require("./utils/singleTicket");
const cleanDataAndReturnArraySingleTicketNotes = require("./utils/singleTicketNotes");
const CleanDataAndReturnCompanyData = require("./utils/companyInfo");
const cleanDataAndReturnResources = require("./utils/resources");
const cleanDataAndReturnArrayOfOpenTicketsPerCompany = require("./utils/ticketPerCompanyHelper");
const SOAPTicketHelper = require("./datasources/getSingleTicket");
const SOAPTicketNotesHelper = require("./datasources/getSingleTicketNotes");
const SOAPTicketsByCompanyHelper = require("./datasources/getTicketsByCompany");
const SOAPGetCompaniesHelper = require("./datasources/getCompanies");
const SOAPAllResources = require("./datasources/getAllResources");
const convert = require("xml-js");
const fetch = require("node-fetch");

const url = "https://webservices14.autotask.net/atservices/1.6/atws.asmx";

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
        console.log("error in the server trying to get Single Ticket", error);
      }
    },
    getSingleTicketNotes: async (_, args) => {
      // console.log(args.id);
      try {
        const response = await fetch(url, SOAPTicketNotesHelper(args.id));
        const thisIsJustAnXMLString = await response.text();
        const toJSONString = convert.xml2json(thisIsJustAnXMLString);
        // console.log("toJSONString: ", JSON.stringify(toJSONString));

        const JSONobj = JSON.parse(toJSONString);
        // console.log("JSONobj: ", JSON.stringify(JSONobj));
        // this will return the new object constructed over there
        return cleanDataAndReturnArraySingleTicketNotes(JSONobj);
      } catch (error) {
        console.log("error in the server trying to get Ticket Notes", error);
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
        return cleanDataAndReturnArrayOfOpenTicketsPerCompany(JSONobj);
      } catch (error) {
        console.log(
          "error in the server trying to get Tickets Per Company",
          error
        );
      }
    },
    // get companies
    getListOfCompanies: async () => {
      try {
        const response = await fetch(url, SOAPGetCompaniesHelper());
        const thisIsJustAnXMLString = await response.text();
        // console.log("thisIsJustAnXMLString: ", thisIsJustAnXMLString);
        const toJSONString = convert.xml2json(thisIsJustAnXMLString);
        // console.log("toJSONString: ", JSON.stringify(toJSONString));

        const JSONobj = JSON.parse(toJSONString);
        // console.log("JSONobj: ", JSON.stringify(JSONobj));
        // this will return the new object constructed over there
        return CleanDataAndReturnCompanyData(JSONobj);
      } catch (error) {
        console.log(
          "error in the server trying to get List of Companies",
          error
        );
      }
    },
    // get single resource
    getAllResources: async () => {
      // console.log(args.id);
      try {
        const response = await fetch(url, SOAPAllResources());
        const thisIsJustAnXMLString = await response.text();
        const toJSONString = convert.xml2json(thisIsJustAnXMLString);
        // console.log("toJSONString: ", JSON.stringify(toJSONString));

        const JSONobj = JSON.parse(toJSONString);
        // console.log("JSONobj: ", JSON.stringify(JSONobj));
        // this will return the new object constructed over there
        return cleanDataAndReturnResources(JSONobj);
      } catch (error) {
        console.log("error in the server trying to get all resources", error);
      }
    }
  }
};

module.exports = resolvers;
