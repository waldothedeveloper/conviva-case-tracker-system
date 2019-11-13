export const ticketPriority = priority => {
  let result = "";
  switch (priority) {
    case 4:
      result = "P1";
      break;
    case 1:
      result = "P2";
      break;
    case 2:
      result = "P3";
      break;
    case 3:
      result = "P4";
      break;
    default:
      result = "Not found";
      break;
  }

  return result;
};
