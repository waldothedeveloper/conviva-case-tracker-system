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
      if (obj.name === "TicketNumber") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = { ticketNumber: obj.elements[0].text })
          : (cleanArrayOfTickets[idx].ticketNumber = obj.elements[0].text);
      }

      if (obj.name === "Title") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = { title: obj.elements[0].text })
          : (cleanArrayOfTickets[idx].title = obj.elements[0].text);
      }

      if (obj.name === "Status") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = { status: obj.elements[0].text })
          : (cleanArrayOfTickets[idx].status = obj.elements[0].text);
      }

      if (obj.name === "Priority") {
        cleanArrayOfTickets[idx] === undefined
          ? (cleanArrayOfTickets[idx] = { priority: obj.elements[0].text })
          : (cleanArrayOfTickets[idx].priority = obj.elements[0].text);
      }
    });
  });

  // console.log("cleanArrayOfTickets", cleanArrayOfTickets);
  return cleanArrayOfTickets;
};
