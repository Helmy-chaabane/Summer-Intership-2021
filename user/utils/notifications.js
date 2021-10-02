import { NOTIFICATION_STATE } from "../constants/enums";
import { generateGraphQlErrors } from "./generateErrors";

const getNotificationsState = (state) => {
  switch (state) {
    case NOTIFICATION_STATE.ERROR:
      return {
        title: "Error",
        color: "tomato",
      };
    case NOTIFICATION_STATE.SUCCESS:
      return {
        title: "Success",
        color: "rgb(75, 181, 67)",
      };
    case NOTIFICATION_STATE.WARNING:
      return {
        title: "Warning",
        color: "goldenrod",
      };
    case NOTIFICATION_STATE.INFO:
      return {
        title: "Info",
        color: "royalblue",
      };

    default:
      return {
        title: "Error",
        color: "tomato",
      };
  }
};

const SuccessNotification = (
  setNotification,
  message,
  duration = 1800,
  closable = false
) => {
  setNotification({
    lunchNotification: true,
    state: getNotificationsState(NOTIFICATION_STATE.SUCCESS),
    message,
    duration,
    closable,
  });
};

const ErrorNotification = (
  setNotification,
  error,
  duration = 1800,
  closable = false
) => {
  const errorMessage = generateGraphQlErrors(error);
  setNotification({
    lunchNotification: true,
    state: getNotificationsState(NOTIFICATION_STATE.ERROR),
    message: `${errorMessage.code} : ${errorMessage.message}`,
    duration,
    closable,
  });
};

const WarningNotification = (
  setNotification,
  message,
  duration = 1800,
  closable = false
) => {
  setNotification({
    lunchNotification: true,
    state: getNotificationsState(NOTIFICATION_STATE.WARNING),
    message,
    duration,
    closable,
  });
};

const InfoNotidication = (
  setNotification,
  message,
  duration = 1800,
  closable = false
) => {
  setNotification({
    lunchNotification: true,
    state: getNotificationsState(NOTIFICATION_STATE.INFO),
    message,
    duration,
    closable,
  });
};

export {
  SuccessNotification,
  ErrorNotification,
  WarningNotification,
  InfoNotidication,
};
