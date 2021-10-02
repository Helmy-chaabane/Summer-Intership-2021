import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { UserContext } from "../../context/userContext";
import { NotificationContext } from "../../context/notificationContext";
import Image from "next/image";
import Main from "../../layout/Main";
import Popup from "../../components/popup/Popup";
import { Grid, GridItem } from "../../components/grid";
import Input from "../../components/input/Input";
import Options from "../../components/options/Options";
import Button from "../../components/button/Button";
import Typography from "../../components/typography/Typography";
import { DELETE_GROUP } from "../../apollo/Mutations/groupMutations";
import { protectedPage } from "../../utils/auth";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../utils/notifications";

const Groups = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const [search, setSearch] = useState("");
  const [groupID, setGroupID] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [deleteGroup, { loading }] = useMutation(DELETE_GROUP, {
    onError: (error) => ErrorNotification(setNotification, error),
    onCompleted: ({ deleteGroup }) => {
      setShowPopUp(!showPopUp);
      setUser((prev) => ({
        ...prev,
        groups: prev.groups.filter(
          (userGroup) => userGroup.group._id !== deleteGroup._id
        ),
      }));
      SuccessNotification(
        setNotification,
        `${deleteGroup.title} has been deleted!`
      );
    },
  });

  useEffect(() => {
    setUserGroups(
      user
        ? user.groups.filter(({ group }) =>
            group.title.toLowerCase().startsWith(search.toLowerCase())
          )
        : []
    );
  }, [search, user]);

  const handleDeleteGroup = () => {
    deleteGroup({
      variables: {
        _id: groupID,
      },
    });
  };

  return (
    <>
      <Main title="Groups" icon="users">
        <div className="groups">
          <div className="groups__form">
            <form onSubmit={(e) => e.preventDefault()}>
              <Input
                name="search"
                placeholder="Search"
                label="Search ..."
                fontSize={1.6}
                type="text"
                handleChange={(e) => setSearch(e.target.value)}
                defaultValue={search}
                icon={({ style }) => <i className={"fa fa-search " + style} />}
                width="25rem"
              />
            </form>
            <Button
              title="Create Group"
              width="20rem"
              icon="plus"
              handleClick={() => router.push("/groups/create")}
            />
          </div>

          <Grid
            numberOfcolumns={2}
            columnGap={50}
            rowGap={40}
            padding={30}
            alignItems="start"
          >
            {userGroups.length ? (
              userGroups.map(({ group: { _id, title, members, imageUrl } }) => (
                <div style={{ position: "relative" }} key={_id}>
                  <GridItem
                    shadow
                    key={_id}
                    maxHeight="50rem"
                    toucheble
                    handleClick={() => router.push(`/groups/${_id}`)}
                    overflow="hidden"
                  >
                    <Image
                      src={imageUrl || "/group.png"}
                      alt="group__image"
                      layout="responsive"
                      width="100%"
                      height="40%"
                      className="group__img"
                    />

                    <div className="group__details">
                      <Typography title={title} />
                      <span className="group__subTitle">{members} members</span>

                      <Button
                        title="View"
                        handleClick={() => router.push(`/groups/${_id}`)}
                        marginTop="1rem"
                      />
                    </div>
                  </GridItem>
                  <Options
                    rotate
                    options={[
                      {
                        text: "Delete group",
                        fct: () => {
                          setShowPopUp(!showPopUp);
                          setGroupID(_id);
                        },
                      },
                    ]}
                  />
                </div>
              ))
            ) : (
              <h1>No Group found</h1>
            )}
          </Grid>
        </div>
        <Popup
          title="Deleting Group"
          show={showPopUp}
          handleShow={() => {
            setShowPopUp(!showPopUp);
            setGroupID("");
          }}
        >
          <Typography
            title={`Are you sure you want to delete group ?`}
            fontSize="1.3rem"
          />
          <Button
            title="Delete"
            width="15rem"
            backgroundColor="red"
            float="right"
            handleClick={() => handleDeleteGroup()}
            disabled={loading}
          />
        </Popup>
      </Main>
      <style jsx>{`
        .groups {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 0 1rem;
        }
        .groups__form {
          width: 50rem;
          align-self: flex-end;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .group__details {
          position: relative;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
        }
        .group__subTitle {
          font-size: 1.5rem;
          font-weight: normal;
          color: grey;
          margin: 0 1rem 1.5rem;
        }

        .group__description {
          font-size: 1.5rem;
          font-weight: 500;
          flex: 1;
          margin-bottom: 1rem;
          white-space: pre-line;
        }
      `}</style>
    </>
  );
};

export default Groups;

export const getServerSideProps = (ctx) => protectedPage(ctx);
