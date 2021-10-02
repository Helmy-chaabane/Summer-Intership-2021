import { useState, createContext } from "react";
import { NOTIFICATION_STATE } from "../constants/enums";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({});

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationProvider;
