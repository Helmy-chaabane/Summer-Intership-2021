import StyleSheet from "./navigate.module.scss";
import Link from "next/link";

const Navigate = ({ title, to }) => {
  return (
    <Link href={to}>
      <a className={StyleSheet.navigate}>{title}</a>
    </Link>
  );
};

export default Navigate;
