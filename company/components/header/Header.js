import { useRouter } from "next/router";
import StyleSheet from "./header.module.scss";
import Avatar from "../avatar/Avatar";

const Header = ({ user }) => {
  const router = useRouter();

  return (
    <>
      <div className={StyleSheet.header}>
        <ul className={StyleSheet.header__list}>
          <li className={StyleSheet.header__item}>
            <i className="fa fa-bell" />
            <div className={StyleSheet.header__subItem}></div>
          </li>
          <li className={StyleSheet.header__item}>
            <i className="fa fa-question" />
            <div className={StyleSheet.header__subItem}></div>
          </li>
          <li className={StyleSheet.header__item}>
            <Avatar
              img={user?.imageUrl}
              radius={25}
              title={user?.name}
              fontTitle="1.5rem"
              handleClick={() => router.push(`/profile/${user?._id}`)}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
