// const myJSON = require("./result.json");
// const myTicketSamples = require("./ticketsSamples");

const url = "https://webservices14.autotask.net/atservices/1.6/atws.asmx";
const SOAPTicketHelper = require("./datasources/autotaskAPI");
const convert = require("xml-js");
const fetch = require("node-fetch");

const resolvers = {
  Query: {
    getAutoTaskSingleTicket: async (_, args) => {
      try {
        const response = await fetch(url, SOAPTicketHelper(args.id));
        const thisIsJustAString = await response.text();
        const jsonifiedString = convert.xml2json(thisIsJustAString);
        const obj = JSON.parse(jsonifiedString);
        // making the JSON an Array of Arrays ( with objects included)
        const toArray = Object.entries(obj);

        // finding the depth of the Arrays (will not go all the way in since some are objects)
        function getArrayDepth(value) {
          return Array.isArray(value)
            ? 1 + Math.max(...value.map(getArrayDepth))
            : 0;
        }

        // find how deep is
        const depth = getArrayDepth(toArray);

        // NOTE: if the depth is greater than 0 then flatten
        // flattening the Array of arrays to whatever depth was able to find
        const flattened = toArray.flat(depth);

        let description = {};
        let words = ["Description", "Title", "TicketNumber"];

        const findDescription = (JSarray, word) => {
          let found = e => e.name && e.name === word;

          JSarray.map(each => {
            if (
              typeof each === "object" &&
              each.elements &&
              Array.isArray(each.elements)
            ) {
              if (found(each)) {
                description[word] = each.elements[0].text;
              }
              findDescription(each.elements, word);
            }
          });
        };

        words.forEach(word => {
          findDescription(flattened, word);
        });

        return description;
      } catch (error) {
        console.log("error in the server", error);
      }
    }
  }
};

module.exports = resolvers;
