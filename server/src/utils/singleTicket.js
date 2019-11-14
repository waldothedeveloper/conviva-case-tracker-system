module.exports = function CleanDataAndReturnTicketObject(obj) {
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

  let ticket = {};

  let words = [
    "Description",
    "Title",
    "TicketNumber",
    "Status",
    "Priority",
    "AssignedResourceID",
    "CreateDate",
    "LastActivityDate",
    "LastActivityResourceID",
    "QueueID",
    "id"
  ];

  // find ticket details and make a new object out of it
  const DestructureData = (JSarray, word) => {
    let found = e => e.name && e.name === word;

    JSarray.map(each => {
      if (
        typeof each === "object" &&
        each.elements &&
        Array.isArray(each.elements)
      ) {
        if (found(each)) {
          ticket[word] = each.elements[0].text;
        }
        DestructureData(each.elements, word);
      }
    });
  };

  // make a new object for each ticket detail
  words.forEach(word => {
    DestructureData(flattened, word);
  });

  // console.log("ticket: ", ticket);
  return ticket;
};
