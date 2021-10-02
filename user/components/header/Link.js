import StyleSheet from "./header.module.scss";
import Link from "next/link";

const Links = ({ to, icon, router, start }) => {
  const path = router.pathname;

  return (
    <li>
      <Link href={to}>
        <a
          className={[
            StyleSheet.header__link,
            start !== path ||
              (path.startsWith(start) && StyleSheet.header__link__active),
          ].join(" ")}
        >
          <svg className={StyleSheet.header__icon}>
            <use href={`/sprites.svg#${icon}`}></use>
          </svg>
        </a>
      </Link>
    </li>
  );
};

export default Links;
