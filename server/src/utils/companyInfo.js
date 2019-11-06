module.exports = function CleanDataAndReturnCompanyData(obj) {
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

  let names = [];
  let cities = [];
  let ids = [];
  let companies = [];
  let words = ["AccountName", "City", "id"];

  // find ticket details and make a new object out of it
  const DestructureData = (JSarray, word) => {
    let found = e => e.name && e.name === word;

    JSarray.map((each, index) => {
      // console.log(`index : ${index}`);
      if (
        typeof each === "object" &&
        each.elements &&
        Array.isArray(each.elements)
      ) {
        if (found(each)) {
          if (each.name === "AccountName") {
            names = [...names, { name: each.elements[0].text }];
          }

          if (each.name === "City") {
            cities = [...cities, { city: each.elements[0].text }];
          }

          if (each.name === "id") {
            ids = [...ids, { id: each.elements[0].text }];
          }
        }
        DestructureData(each.elements, word);
      }
    });
  };

  // make a new object for each ticket detail
  words.forEach(word => {
    DestructureData(flattened, word);
  });

  // creating one single array with company name and city all together
  names.forEach((e, index) => {
    companies.push({
      id: ids[index].id,
      name: e.name,
      city: cities[index].city
    });
  });

  // console.log("Companies: ", JSON.stringify(companies));

  return companies;
};
