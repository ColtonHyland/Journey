export function validateAndFormatDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error(`Invalid date: ${dateString}`);
  }

  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}
