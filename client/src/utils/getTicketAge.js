export function getTicketAge(oldDate) {
  const result = Math.round(
    (new Date() - new Date(oldDate)) / (1000 * 60 * 60 * 24)
  );

  return result > 1
    ? `${result} days`
    : result === 0
    ? `${result} days`
    : `${result} day`;
}
