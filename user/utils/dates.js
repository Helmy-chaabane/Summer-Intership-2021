import moment from "moment";

export const relativeDate = (date) => {
  return moment(date).fromNow();
};

export const formatDates = (date) => {
  return moment(date).format("LL");
};
