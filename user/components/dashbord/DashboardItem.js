import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { AllowedModulesInDashboard } from "../../constants/modules";
import StyleSheet from "./dashboard.module.scss";
import Link from "next/link";

const DashboardItem = ({ icon, iconColor, title, to }) => {
  const { user } = useContext(UserContext);

  return user?.modules.some((m) => m.module.title === title) ||
    AllowedModulesInDashboard.includes(title) ? (
    <Link href={to || "/"}>
      <a className={StyleSheet.dashboard__item}>
        <i
          style={{ color: iconColor }}
          className={[`fa fa-${icon} fa-2x`, StyleSheet.dashboard__icon].join(
            " "
          )}
        />
        <span className={StyleSheet.dashboard__text}>{title}</span>
      </a>
    </Link>
  ) : null;
};

export default DashboardItem;
