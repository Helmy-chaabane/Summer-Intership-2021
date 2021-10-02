import { useState, useEffect, createContext, useContext } from "react";
import { useQuery } from "@apollo/client";
import { NotificationContext } from "./notificationContext";
import Cookies from "js-cookie";
import { ME } from "../apollo/Queries/userQueries";
import { ErrorNotification } from "../utils/notifications";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setNotification } = useContext(NotificationContext);
  useQuery(ME, {
    skip: Cookies.get("token") ? false : true,
    onCompleted: ({ me }) => {
      console.log(me);
      if (me) setUser(me);
    },
    onError: (error) => ErrorNotification(setNotification, error),
  });

  useEffect(() => {
    if (!Cookies.get("token")) setUser(null);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
