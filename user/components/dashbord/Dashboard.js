import DashboardItem from "./DashboardItem";
//import DashboardGroup from "./DashboardGroup";
import Typography from "../typography/Typography";
import { ModulesInDashboard } from "../../constants/modules";
import StyleSheet from "./dashboard.module.scss";

const Dashboard = () => {
  return (
    <nav className={StyleSheet.dashboard}>
      <Typography title="Bridge Innovant" padding="2rem 0" />
      <div className={StyleSheet.dashboard__items}>
        {ModulesInDashboard.map(({ title, to, icon, iconColor }) => (
          <DashboardItem
            key={title}
            title={title}
            to={to}
            icon={icon}
            iconColor={iconColor}
          />
        ))}
      </div>
    </nav>
  );
};

export default Dashboard;
//   <DashboardGroup />
