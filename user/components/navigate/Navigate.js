import StyleSheet from "./navigate.module.scss";
import Link from "next/link";

const Navigate = ({ title, to, ...rest }) => {
  return (
    <Link href={to}>
      <a className={StyleSheet.navigate} style={{ ...rest }}>
        {title}
      </a>
    </Link>
  );
};

export default Navigate;
