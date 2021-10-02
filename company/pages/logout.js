import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import Cookies from "js-cookie";

const Logout = () => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  });

  return <p>loging out</p>;
};

export default Logout;
