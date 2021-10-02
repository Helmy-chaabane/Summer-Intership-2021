import { useState } from "react";

import StyleSheet from "./dashboard.module.scss";
import Link from "next/link";

const DashboardGroup = ({ title, list }) => {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <div className={StyleSheet.dashboard__group}>
        <div
          className={StyleSheet.dashboard__item}
          onClick={() => setSelected(!selected)}
        >
          <i
            className={["fa fa-users fa-2x", StyleSheet.dashboard__icon].join(
              " "
            )}
          />
          <span className={StyleSheet.dashboard__text}>{title}</span>
          <i className={"fa fa-chevron-up fa-1x chuv"} />
        </div>
        <div
          className={[
            StyleSheet.dashboard__list,
            selected && StyleSheet.dashboard__list__shrink,
          ].join(" ")}
        >
          <Link href="/">
            <a className={StyleSheet.dashboard__list__link}> Users </a>
          </Link>
          <Link href="/">
            <a className={StyleSheet.dashboard__list__link}>Users</a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .chuv {
          margin-left: auto;
          color: #000;
          transform: ${!selected ? "rotate(180deg)" : "rotate(0deg)"};
          transition: transform 0.2s;
        }
      `}</style>
    </>
  );
};

export default DashboardGroup;
