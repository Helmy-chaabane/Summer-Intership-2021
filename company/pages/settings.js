import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { NotificationContext } from "../context/notificationContext";
import { UserContext } from "../context/userContext";
import Main from "../layout/Main";
import Loading from "../components/loading/Loading";
import CompanyImage from "../components/company/CompanyImage";
import CompanyInfo from "../components/company/CompanyInfo";
import AddJob from "../components/job/AddJob";
import { Grid, GridItem } from "../components/grid";
import { Table, TableContainer, TableItem } from "../components/table";
import Popup from "../components/popup/Popup";
import Options from "../components/options/Options";
import Button from "../components/button/Button";
import Typography from "../components/typography/Typography";
import { JOBS } from "../apollo/Queries/jobQueries";
import { DELETE_JOB } from "../apollo/Mutations/jobMutations";
import { protectedPage } from "../utils/auth";
import EditCompany from "../components/company/EditCompany";
import { ErrorNotification } from "../utils/notifications";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const [showEditPop, setShowEditPop] = useState(false);
  const [showJobPop, setShowJobPop] = useState(false);

  const { data, loading } = useQuery(JOBS, {
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const [deleteJob] = useMutation(DELETE_JOB, {
    update(cache, { data: { deleteJob } }) {
      cache.modify({
        fields: {
          jobs(existingTodos) {
            return existingTodos.filter((job) => job._id !== deleteJob._id);
          },
        },
      });
    },
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const deleteJobs = (_id) => {
    deleteJob({
      variables: {
        _id,
      },
    });
  };

  return user ? (
    <>
      <Main title="Settings" icon="cog">
        <div className="settings">
          <Grid padding=" 2rem 1rem" minWidth="65%" rowGap={20}>
            <GridItem shadow padding="2rem 4rem" overflow="auto">
              <CompanyImage
                company={user.company}
                setNotification={setNotification}
              />
            </GridItem>

            <div className="settings__titles">
              <Typography title="Jobs" fontSize="2rem" />
              <Button
                title="Add job"
                icon="plus"
                width="10rem"
                handleClick={() => setShowJobPop(true)}
              />
            </div>

            <Table titles={["Job", "Action"]}>
              {data && !loading ? (
                data.jobs.map(({ title, _id }) => (
                  <TableContainer clickable key={_id}>
                    <TableItem>{title}</TableItem>
                    <TableItem>
                      <Options
                        relative
                        options={[
                          { text: "Delete Job", fct: () => deleteJobs(_id) },
                        ]}
                      />
                    </TableItem>
                  </TableContainer>
                ))
              ) : (
                <Loading text="Loading jobs" font={1} color="gray" />
              )}
            </Table>
          </Grid>
          <Grid padding=" 2rem 1rem" minWidth="35%">
            <GridItem
              padding="2rem"
              shadow
              display="flex"
              flexDirection="column"
            >
              <Typography
                title="Company"
                color="gray"
                fontSize="2rem"
                margin={0}
              />

              <CompanyInfo company={user.company} />
              <div>
                <Button
                  title="Edit Company"
                  icon="edit"
                  width="20rem"
                  float="right"
                  handleClick={() => setShowEditPop(true)}
                />
              </div>
            </GridItem>
          </Grid>
        </div>
        <Popup
          show={showEditPop || showJobPop}
          title={showEditPop ? "Edit Company" : "Add Job"}
          handleShow={() =>
            showEditPop ? setShowEditPop(false) : setShowJobPop(false)
          }
        >
          {showEditPop ? (
            <EditCompany
              company={user.company}
              setUser={setUser}
              setNotification={setNotification}
              setShowPop={setShowEditPop}
            />
          ) : (
            <AddJob
              setNotification={setNotification}
              setShowPop={setShowJobPop}
            />
          )}
        </Popup>
      </Main>

      <style jsx>{`
        .settings {
          display: flex;
          align-items: flex-start;
        }

        .settings__titles {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid gray;
        }
      `}</style>
    </>
  ) : (
    <Loading font={1.5} text="Loading company " loadingPage />
  );
};

export default Settings;

export const getServerSideProps = (ctx) => protectedPage(ctx);
