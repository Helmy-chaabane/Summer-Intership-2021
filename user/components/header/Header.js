import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/userContext";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../avatar/Avatar";
import StyleSheet from "./header.module.scss";
import Links from "./Link";

const Header = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  return (
    <>
      <div className={StyleSheet.header}>
        <div className={StyleSheet.header__logobar}>
          <Image
            src={user?.owned.company?.imageUrl || "/logo.jpg"}
            width={50}
            height={30}
            className={StyleSheet.header__logo}
            alt="logo"
          />

          <span className={StyleSheet.header__logobar__name}>
            {user?.owned.company?.name}
          </span>
        </div>
        <ul className={StyleSheet.header__list}>
          <Links to="/" icon="icon-home" router={router} start="/" />
          <Links to="/users" icon="icon-users" router={router} start="/users" />
          <Links
            to="/groups"
            icon="icon-groups"
            router={router}
            start="/groups"
          />
        </ul>

        <div className={StyleSheet.header__user}>
          <i
            className={["fa fa-comment", StyleSheet.header__user__icon].join(
              " "
            )}
          />
          <i
            className={["fa fa-bell", StyleSheet.header__user__icon].join(" ")}
          />
          <div className={StyleSheet.header__user__profile}>
            <Avatar
              img={user?.imageUrl || "/user.png"}
              title={user?.name}
              radius="40px"
              fontTitle="1.3rem"
            />
            <ul className={StyleSheet.header__user__list}>
              <Link href={"/profile/" + user?._id}>
                <a className={StyleSheet.header__user__list__link}>Profile</a>
              </Link>
              <Link href={"/logout"}>
                <a className={StyleSheet.header__user__list__link}>Logout</a>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
