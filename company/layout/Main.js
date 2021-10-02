import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Container from "./Container";
import Dashboard from "../components/Dashbord/Dashboard";
import Header from "../components/header/Header";

import Typography from "../components/typography/Typography";

const Main = ({ title, children, icon, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Container display="flex" position="relative">
        <Dashboard modules={user?.modules} companyName={user?.company?.name} />
        <main className="main">
          <Header user={user} />
          <div className="main__container">
            <div className="main__title">
              <i className={`fa fa-${icon} main__title__icon`} />
              <Typography title={title} fontSize="2rem" />
            </div>
            <div style={{ ...rest }}>{children}</div>
          </div>
        </main>
      </Container>

      <style jsx>
        {`
          .main {
            flex: 1;
            background-color: rgb(250, 250, 250);
            min-height: 100%;
            color: #000;
          }

          .main__container {
            width: 100%;
            padding: 3rem 1.5rem;
          }

          .main__title {
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
          }

          .main__title__icon {
            font-size: 2rem;
          }
        `}
      </style>
    </>
  );
};

export default Main;
