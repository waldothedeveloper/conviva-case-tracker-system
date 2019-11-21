module.exports = function cleanDataAndReturnArrayOfOpenTicketsPerCompany(obj) {
  // making the JSON an Array of Arrays ( with objects included)
  const toArray = Object.entries(obj);

  // finding the depth of the Arrays (will not go all the way in since some are objects)
  function getArrayDepth(value) {
    return Array.isArray(value) ? 1 + Math.max(...value.map(getArrayDepth)) : 0;
  }

  // find how deep is
  const depth = getArrayDepth(toArray);

  // flattening the Array of arrays to whatever depth was able to find
  const flattened = toArray.flat(depth);
  // console.log("flattened: ", JSON.stringify(flattened));

  let tickets = [];

  //! 1.First find each ticket and put it into an array or objects
  const FindEachTicket = (JSONarray, word) => {
    let findTicket = e => e.name && e.name === word;

    JSONarray.map(each => {
      if (
        typeof each === "object" &&
        each.elements &&
        Array.isArray(each.elements)
      ) {
        if (findTicket(each)) {
          // console.log("found it:", JSON.stringify(each.name));
          tickets.push(each);
        }
        FindEachTicket(each.elements, word);
      }
    });
  };

  FindEachTicket(flattened, "Entity");

  //! 2. Delete unused properties from each object of the new array
  const getOnlyTicketInfo = tickets.filter(element => {
    let arrayOfObjKeys = Object.keys(element);

    for (let key of arrayOfObjKeys) {
      if (!Array.isArray(element[key])) {
        delete element[key];
      }
    }

    return element;
  });

  let numberOfTickets = getOnlyTicketInfo.length;
  let cleanArrayOfTickets = [];
  cleanArrayOfTickets.length = numberOfTickets;

  getOnlyTicketInfo.map((elements, idx) => {
    elements.elements.map(obj => {
      if (obj.name === "Description") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = { Description: obj.elements[0].text })
          : (cleanArrayOfTickets[idx].Description = obj.elements[0].text);
      }

      if (obj.name === "Title") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = { Title: obj.elements[0].text })
          : (cleanArrayOfTickets[idx].Title = obj.elements[0].text);
      }

      if (obj.name === "TicketNumber") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = { TicketNumber: obj.elements[0].text })
          : (cleanArrayOfTickets[idx].TicketNumber = obj.elements[0].text);
      }

      if (obj.name === "Status") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = { Status: obj.elements[0].text })
          : (cleanArrayOfTickets[idx].Status = obj.elements[0].text);
      }

      if (obj.name === "Priority") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = { Priority: obj.elements[0].text })
          : (cleanArrayOfTickets[idx].Priority = obj.elements[0].text);
      }

      if (obj.name === "AssignedResourceID") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = {
              AssignedResourceID: obj.elements[0].text
            })
          : (cleanArrayOfTickets[idx].AssignedResourceID =
              obj.elements[0].text);
      }

      if (obj.name === "CreateDate") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = { CreateDate: obj.elements[0].text })
          : (cleanArrayOfTickets[idx].CreateDate = obj.elements[0].text);
      }

      if (obj.name === "LastActivityDate") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = {
              LastActivityDate: obj.elements[0].text
            })
          : (cleanArrayOfTickets[idx].LastActivityDate = obj.elements[0].text);
      }

      if (obj.name === "LastActivityResourceID") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = {
              LastActivityResourceID: obj.elements[0].text
            })
          : (cleanArrayOfTickets[idx].LastActivityResourceID =
              obj.elements[0].text);
      }

      if (obj.name === "QueueID") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = { QueueID: obj.elements[0].text })
          : (cleanArrayOfTickets[idx].QueueID = obj.elements[0].text);
      }

      if (obj.name === "UserDefinedFields") {
        // console.log("FOUND NOTES:", JSON.stringify(obj));

        // If there are business friendly ticket notes
        if (obj.elements !== undefined && Array.isArray(obj.elements)) {
          obj.elements.map(userDefinedField => {
            if (
              userDefinedField.elements[0].elements[0].text ===
                "Service Desk (Governance) Commentary" &&
              userDefinedField.elements[1] !== undefined
            ) {
              // console.log("userDefinedField", JSON.stringify(userDefinedField));
              cleanArrayOfTickets[idx] === undefined
                ? (cleanArrayOfTickets[idx] = {
                    UserDefinedFields:
                      userDefinedField.elements[1].elements[0].text
                  })
                : (cleanArrayOfTickets[idx].UserDefinedFields =
                    userDefinedField.elements[1].elements[0].text);
            }
          });
        } else {
          cleanArrayOfTickets[idx] === undefined
            ? (cleanArrayOfTickets[idx] = { UserDefinedFields: null })
            : (cleanArrayOfTickets[idx].UserDefinedFields = null);
        }
      }
    });
  });

  // console.log("cleanArrayOfTickets", cleanArrayOfTickets)
  return cleanArrayOfTickets;
};
