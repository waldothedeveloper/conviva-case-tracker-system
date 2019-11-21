export const ticketStatus = status => {
  let result = "";
  switch (status) {
    case 1:
      result = "New";
      break;
    case 13:
      result = "Waiting Approval";
      break;
    case 10:
      result = "Dispatched";
      break;
    case 15:
      result = "Change Order";
      break;
    case 19:
      result = "Customer Note Added";
      break;
    case 8:
      result = "In Progress";
      break;
    case 11:
      result = "Escalate";
      break;
    case 9:
      result = "Waiting Materials";
      break;
    case 7:
      result = "Waiting Customer";
      break;
    case 12:
      result = "Waiting Vendor";
      break;
    case 17:
      result = "On Hold";
      break;
    case 16:
      result = "Inactive";
      break;
    case 5:
      result = "Complete";
      break;
    default:
      return "No status found";
  }

  return result;
};
