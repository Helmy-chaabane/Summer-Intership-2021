import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { UserContext } from "../../context/userContext";
import { NotificationContext } from "../../context/notificationContext";
import Image from "next/image";
import Loading from "../../components/loading/Loading";
import Main from "../../layout/Main";
import { Grid, GridItem } from "../../components/grid";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Typography from "../../components/typography/Typography";
import Tags from "../../components/tags/Tags";
import Tabs from "../../components/tabs/Tab";
import { GROUPS } from "../../apollo/Queries/groupQueries";
import { CREATE_USERGROUP } from "../../apollo/Mutations/userGroupMutations";
import { PRIVACY, ROLES } from "../../constants/enums";
import { protectedPage } from "../../utils/auth";
import {
  ErrorNotification,
  InfoNotidication,
  SuccessNotification,
} from "../../utils/notifications";

const Groups = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState([]);
  const [owned, setOwned] = useState(true);
  const { data, loading } = useQuery(GROUPS, {
    skip: !user,
    variables: {
      user: user?._id,
    },
    onCompleted: ({ groups }) =>
      setGroups(
        groups.filter((group) => group.users.length && group.users[0]?.accepted)
      ),
    onError: (error) => ErrorNotification(setNotification, error),
  });
  const [createUserGroup] = useMutation(CREATE_USERGROUP, {
    update(cache, { data: { createUserGroup } }) {
      cache.modify({
        id: cache.identify({ __ref: `Group:${createUserGroup.group._id}` }),
        broadcast: true,
        fields: {
          users(existingComments) {
            return [
              ...existingComments,
              { __ref: `UserGroup:${createUserGroup._id}` },
            ];
          },
        },
      });
    },
    onCompleted: ({ createUserGroup }) => {
      setOwned(true);
      if (createUserGroup.group.privacy === PRIVACY.PUBLIC) {
        setGroups(
          groups.filter((group) => group._id !== createUserGroup.group._id)
        );
        setUser((prev) => ({
          ...prev,
          groups: [...prev.groups, createUserGroup],
        }));

        SuccessNotification(
          setNotification,
          `You are now following '${createUserGroup.group.title}'`
        );
      } else {
        InfoNotidication(
          setNotification,
          "Your request has been sent to admins! please wait untill then",
          2500
        );
      }
    },
    onError: (error) => ErrorNotification(setNotification, error, 2400),
  });

  useEffect(() => {
    if (data)
      setGroups(
        owned
          ? data?.groups.filter(
              (group) =>
                group.users.length &&
                group.users[0]?.accepted &&
                group.title.toLowerCase().startsWith(search.toLowerCase())
            )
          : data?.groups.filter(
              (group) =>
                (!group.users.length || !group.users[0]?.accepted) &&
                group.title.toLowerCase().startsWith(search.toLowerCase())
            )
      );
    else setGroups([]);
  }, [owned, search, data]);

  const handleUserGroup = (group) => {
    if (!group.users[0]?.accepted)
      createUserGroup({
        variables: {
          user: user?._id,
          group: group._id,
          accepted: group.privacy === PRIVACY.PUBLIC ? true : false,
          role: ROLES.USER,
        },
      });
    else router.push("/groups/" + group._id);
  };

  return !loading && groups ? (
    <>
      <Main title="Groups">
        <div className="groups">
          <div className="groups__form">
            <form onSubmit={(e) => e.preventDefault()}>
              <Input
                name="search"
                placeholder="Search"
                label="Search ..."
                type="text"
                autoFocus
                handleChange={(e) => setSearch(e.target.value)}
                defaultValue={search}
                icon={({ style }) => <i className={"fa fa-search " + style} />}
                width="25rem"
              />
            </form>
          </div>

          <Tabs
            titles={[
              {
                text: "My groups",
                id: "groups",
                fct: () => {
                  setOwned(true);
                },
                checked: owned,
              },
              {
                text: "Explore",
                id: "explore",
                fct: () => {
                  setOwned(false);
                },
                checked: !owned,
              },
            ]}
          />

          <Grid
            numberOfcolumns={2}
            columnGap={50}
            rowGap={40}
            padding={30}
            alignItems="start"
          >
            {groups.length ? (
              groups.map((group) => (
                <GridItem shadow key={group._id} toucheble={owned}>
                  <div
                    className="group"
                    onClick={() => owned && router.push(`/groups/${group._id}`)}
                  >
                    <Image
                      src={group.imageUrl || "/group.png"}
                      alt="group__image"
                      layout="responsive"
                      width="100%"
                      height="50%"
                    />

                    <div className="group__details">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          title={group.title}
                          display="inline-block"
                        />
                        <Tags
                          text={group.privacy}
                          color={
                            group.privacy === PRIVACY.PRIVATE
                              ? "tomato"
                              : "forestgreen"
                          }
                        />
                      </div>

                      <span className="group__subTitle">
                        {group.members} members
                      </span>
                      <Button
                        title={
                          owned
                            ? "View"
                            : !group.users.length
                            ? "Follow"
                            : "Pending"
                        }
                        width="100%"
                        handleClick={() => handleUserGroup(group)}
                      />
                    </div>
                  </div>
                </GridItem>
              ))
            ) : (
              <h1>
                {owned
                  ? "You are not in any group yet, Explore some :)"
                  : "No Group found"}
              </h1>
            )}
          </Grid>
        </div>
      </Main>
      <style jsx>{`
        .groups {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 0 1rem;
        }

        .groups__form {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .group {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .group__img {
          width: 100%;
          flex: 0 0 50%;
          background: red;
        }

        .group__details {
          flex: 1;
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
  ) : (
    <Loading loadingPage text="Loading Groups" font={1.5} />
  );
};

export default Groups;

export const getServerSideProps = (ctx) => protectedPage(ctx);
