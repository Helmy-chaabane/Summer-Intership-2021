import DashboardItem from "./DashboardItem";
import Typography from "../typography/Typography";
import { ModulesInDashboard } from "../../constants/modules";
import StyleSheet from "./dashboard.module.scss";

const Dashboard = ({ modules, companyName = "Company" }) => {
  return (
    <nav className={StyleSheet.dashboard}>
      <Typography title={companyName} padding="2rem 0" />
      <div className={StyleSheet.dashboard__items}>
        {ModulesInDashboard.map(({ title, to, icon, iconColor }) => (
          <DashboardItem
            key={title}
            title={title}
            to={to}
            icon={icon}
            iconColor={iconColor}
            modules={modules}
          />
        ))}
      </div>
    </nav>
  );
};

export default Dashboard;
//   <DashboardGroup />
