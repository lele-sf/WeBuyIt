export const formatTimestamp = (timestamp, locale = "pt-BR") => {
  if (!timestamp) return "";

  if (timestamp.seconds && timestamp.nanoseconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString(locale);
  }

  try {
    return new Date(timestamp).toLocaleDateString(locale);
  } catch (error) {
    return "";
  }
};

export const formatEventDate = (date) => {
  if (!date) return new Date();

  if (date.toDate && typeof date.toDate === "function") {
    return date.toDate();
  } else if (date.seconds) {
    return new Date(date.seconds * 1000);
  } else {
    return new Date(date);
  }
};

export const formatFullDate = (date) => {
  const jsDate = formatEventDate(date);
  return jsDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatShortDate = (date) => {
  const jsDate = formatEventDate(date);
  return jsDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (date) => {
  if (!date) return "--:--";

  const jsDate = date instanceof Date ? date : formatEventDate(date);
  return `${jsDate.getHours().toString().padStart(2, "0")}:${jsDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};
