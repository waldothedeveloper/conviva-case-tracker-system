export function getTicketAge(oldDate) {
  return Math.round((new Date() - new Date(oldDate)) / (1000 * 60 * 60 * 24));
}
