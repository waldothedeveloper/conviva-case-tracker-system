module.exports = function cleanDataAndReturnResources(obj) {
  // making the JSON an Array of Arrays ( with objects included)
  const toArray = Object.entries(obj);
  // console.log("toArray: ", JSON.stringify(toArray));

  // finding the depth of the Arrays (will not go all the way in since some are objects)
  function getArrayDepth(value) {
    return Array.isArray(value) ? 1 + Math.max(...value.map(getArrayDepth)) : 0;
  }

  // find how deep is
  const depth = getArrayDepth(toArray);

  // flattening the Array of arrays to whatever depth was able to find
  const flattened = toArray.flat(depth);
  // console.log("flattened: ", JSON.stringify(flattened));
  let resources = [];

  //! 1.First find each resource and put it into an array or objects
  const FindEachResource = (JSONarray, word) => {
    let findResource = e => e.name && e.name === word;

    JSONarray.map(each => {
      if (
        typeof each === "object" &&
        each.elements &&
        Array.isArray(each.elements)
      ) {
        if (findResource(each)) {
          resources.push(each);
        }
        FindEachResource(each.elements, word);
      }
    });
  };

  FindEachResource(flattened, "Entity");

  //! 2. Delete unused properties from each object of the new array
  const getOnlyResourceInfo = resources.filter(element => {
    let arrayOfObjKeys = Object.keys(element);

    for (let key of arrayOfObjKeys) {
      if (!Array.isArray(element[key])) {
        delete element[key];
      }
    }

    return element;
  });

  let numberOfResources = getOnlyResourceInfo.length;
  let cleanArrayOfResources = [];
  cleanArrayOfResources.length = numberOfResources;

  //! Get only what you need
  getOnlyResourceInfo.map((elements, idx) => {
    elements.elements.map(obj => {
      if (obj.name === "FirstName") {
        cleanArrayOfResources[idx] === undefined
          ? (cleanArrayOfResources[idx] = {
              FirstName: obj.elements[0].text
            })
          : (cleanArrayOfResources[idx].FirstName = obj.elements[0].text);
      }

      if (obj.name === "LastName") {
        cleanArrayOfResources[idx] === undefined
          ? (cleanArrayOfResources[idx] = {
              LastName: obj.elements[0].text
            })
          : (cleanArrayOfResources[idx].LastName = obj.elements[0].text);
      }

      if (obj.name === "id") {
        cleanArrayOfResources[idx] === undefined
          ? (cleanArrayOfResources[idx] = { id: obj.elements[0].text })
          : (cleanArrayOfResources[idx].id = obj.elements[0].text);
      }
    });
  });
  // console.log("cleanArrayOfResources", JSON.stringify(cleanArrayOfResources));
  return cleanArrayOfResources;
};
