import { useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import { NotificationContext } from "../context/notificationContext";
import Container from "../layout/Container";
import { Grid, GridItem } from "../components/grid";
import Typography from "../components/typography/Typography";
import Button from "../components/button/Button";
import { GET_MODULES } from "../apollo/Queries/moduleQueries";
import {
  ADD_MODULES_FOR_USER,
  UPDATE_USER,
} from "../apollo/Mutations/userMutations";
import { ErrorNotification } from "../utils/notifications";
import { protectedPage } from "../utils/auth";

const Modules = () => {
  const router = useRouter();
  const { setNotification } = useContext(NotificationContext);
  const { user, setUser } = useContext(UserContext);
  const [selectedModules, setSelectedModules] = useState([]);
  const { data } = useQuery(GET_MODULES, {
    skip: !user ? true : false,
    onError: (error) => ErrorNotification(setNotification, error),
  });
  const [updateUser] = useMutation(UPDATE_USER, {
    onError: (error) => ErrorNotification(setNotification, error),
  });
  const [addModules, { loading }] = useMutation(ADD_MODULES_FOR_USER, {
    onCompleted: ({ addModulesforUser: modules }) => {
      if (user.firstRun)
        updateUser({
          variables: { _id: user._id, firstRun: false },
        });

      setUser((prev) => ({ ...prev, modules }));
      router.push("/");
    },
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const isModuleExistsInUser = (moduleID) => {
    return user.modules.some((mod) => mod.module._id === moduleID);
  };

  const isSelected = (module) => {
    return selectedModules.includes(module);
  };

  const toggleModule = (module) => {
    if (selectedModules.includes(module))
      setSelectedModules(selectedModules.filter((mod) => mod !== module));
    else setSelectedModules([...selectedModules, module]);
  };

  const handleTrial = () => {
    if (selectedModules)
      addModules({
        variables: { modules: selectedModules.map((mod) => mod._id) },
      });
  };

  return (
    <>
      <Container padding="4rem">
        <div className="modules">
          <Typography
            title="Choose your Modules"
            fontSize="3rem"
            textAlign="center"
            fontWeight="600"
            letterSpacing="2px"
          />

          <div className="modules__grid">
            <Grid numberOfcolumns={3} rowGap={20} padding={10}>
              {!data ? (
                <Typography title="Loading modules ..." />
              ) : (
                data.modules.map((module) => {
                  const isExists = isModuleExistsInUser(module._id);
                  const selected = isSelected(module);
                  return (
                    <GridItem
                      key={module._id}
                      toucheble={!isExists}
                      handleClick={() => toggleModule(module)}
                      shadow
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <div className="module__details">
                        <i
                          className="fa fa-users fa-3x"
                          style={{ color: "rgb(119,100,228)" }}
                        />
                        <span className="module__description">
                          {module.title}
                        </span>
                      </div>
                      {(isExists || selected) && (
                        <div className="module__selected">
                          <i
                            className="fa fa-check"
                            style={{ color: "#fff" }}
                          ></i>
                        </div>
                      )}
                    </GridItem>
                  );
                })
              )}
            </Grid>
            <div className="modules__selected">
              <Typography
                title={`${selectedModules.length} module(s) selected`}
                fontSize="2rem"
              />
              <div className="modules__selected__items">
                {selectedModules.map((module) => (
                  <div className="modules__selected__item" key={module._id}>
                    <i
                      className="fa fa-users fa-3x"
                      style={{ color: "rgb(119,100,228)", marginRight: 10 }}
                    />
                    <span className="module__description">{module.title}</span>
                  </div>
                ))}
              </div>

              {selectedModules.length ? (
                <Button
                  title="TRY NOW"
                  width="100%"
                  handleClick={handleTrial}
                  disabled={loading}
                >
                  <span className="module__btn">15 days Free trial</span>
                </Button>
              ) : (
                <Button
                  title="Continue &rarr;"
                  width="100%"
                  handleClick={handleTrial}
                  disabled={loading}
                />
              )}
            </div>
          </div>
        </div>
      </Container>

      <style jsx>
        {`
          .modules__grid {
            display: flex;
            padding: 2rem 5rem;
            justify-content: center;
            align-items: start;
          }

          .module__details {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 30%;
          }

          .module__description {
            font-size: 1.6rem;
            font-weight: 400;
          }
          .module__selected {
            background-color: green;
            position: absolute;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            right: 4%;
            top: 4%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .modules__selected {
            flex:0 0 20%
            min-height: 45rem;
            padding: 2rem;
            align-self: stretch;
            box-shadow: 0 0.6rem 2rem 0 rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .modules__selected__items {
            flex: 1;
            padding: 3rem 0;
            margin-bottom: 3rem;
          }

          .modules__selected__item {
            display: flex;
          }

          .modules__selected__item:not(:last-child) {
            margin-bottom: 3rem;
          }

          .module__btn {
            display: block;
            font-size: 1.6rem;
            font-weight: 400;
            margin-top: 2rem;
            letter-spacing: 1.5px;
          }
        `}
      </style>
    </>
  );
};

export default Modules;

export const getServerSideProps = (ctx) => protectedPage(ctx);
