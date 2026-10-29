export const etb = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
});

export const when = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

export const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
