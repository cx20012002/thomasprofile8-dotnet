// Format date to NZ format (DD-MM-YYYY)
export const formatDateToNZFormat = (date: string | Date): string => {
  return new Date(date)
    .toLocaleDateString("en-NZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      formatMatcher: "basic",
    })
    .replace(/\//g, "-");
}; 
