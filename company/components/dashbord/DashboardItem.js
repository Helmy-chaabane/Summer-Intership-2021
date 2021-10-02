import { useRouter } from "next/router";
import { AllowedModulesInDashboard } from "../../constants/modules";
import StyleSheet from "./dashboard.module.scss";
import Link from "next/link";

const DashboardItem = ({ icon, iconColor, title, to, modules }) => {
  const router = useRouter();

  const status = router.pathname === to;
  return modules?.some((m) => m.module.title === title) ||
    AllowedModulesInDashboard.includes(title) ? (
    <Link href={to || "/"}>
      <a
        className={[
          StyleSheet.dashboard__item,
          status && StyleSheet.dashboard__item__active,
        ].join(" ")}
      >
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
