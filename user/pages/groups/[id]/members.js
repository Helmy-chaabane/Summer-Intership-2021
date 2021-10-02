import { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { UserContext } from "../../../context/userContext";
import { NotificationContext } from "../../../context/notificationContext";
import Main from "../../../layout/Main";
import Avatar from "../../../components/avatar/Avatar";
import Loading from "../../../components/loading/Loading";
import Input from "../../../components/input/Input";
import Tab from "../../../components/tabs/Tab";
import Options from "../../../components/options/Options";
import { Table, TableItem, TableContainer } from "../../../components/table";
import { GROUP_USERS } from "../../../apollo/Queries/userGroupQueries";
import {
  DELETE_USERGROUP,
  UPDATE_USERGROUP,
} from "../../../apollo/Mutations/userGroupMutations";
import { ErrorNotification } from "../../../utils/notifications";
import { protectedPage } from "../../../utils/auth";
import { formatDates } from "../../../utils/dates";
import { ROLES } from "../../../constants/enums";

const Members = ({ id }) => {
  const router = useRouter();
  const { setNotification } = useContext(NotificationContext);
  const { user: me } = useContext(UserContext);
  const [accepted, setAccepted] = useState(true);
  const [search, setSearch] = useState("");
  const [groupsUsers, setGroupsUsers] = useState([]);
  const { data, loading } = useQuery(GROUP_USERS, {
    skip: !id,
    variables: { group: id, accepted },
    onCompleted: ({ groupUsers }) => setGroupsUsers(groupUsers),
    onError: (error) => ErrorNotification(setNotification, error),
    fetchPolicy: "network-only",
  });
  const [deleteUserGroup] = useMutation(DELETE_USERGROUP, {
    onCompleted: ({ deleteUserGroup }) =>
      setGroupsUsers((prev) =>
        prev.filter((ug) => ug._id !== deleteUserGroup._id)
      ),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const [updateUserGroup] = useMutation(UPDATE_USERGROUP, {
    onCompleted: ({ updateUserGroup }) =>
      setGroupsUsers((prev) =>
        prev.filter((ug) => ug._id !== updateUserGroup._id)
      ),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  useEffect(() => {
    if (data) {
      setGroupsUsers(
        data.groupUsers.filter(
          ({ user }) =>
            user.name.toLowerCase().startsWith(search.toLowerCase()) ||
            user.email.toLowerCase().startsWith(search.toLowerCase())
        )
      );
    }
  }, [search, data]);

  const deleteUserFromGroup = (_id) => {
    deleteUserGroup({
      variables: {
        _id,
      },
    });
  };
  const acceptUserToGroup = (_id) => {
    updateUserGroup({
      variables: {
        _id,
        accepted: true,
        role: ROLES.USER,
        joinDate: Date.now(),
      },
    });
  };

  const admin =
    me?.groups.find((ug) => ug.group._id === id)?.role === ROLES.ADMIN;

  const titles = accepted
    ? admin
      ? ["Name", "Email", "Number of posts", "Join date", "Role", "Action"]
      : ["Name", "Email", "Number of posts", "Join date", "Role"]
    : ["Name", "Email", "Request Date", "Action"];

  return !loading ? (
    <>
      <Main
        title={`Groups/${
          me?.groups.find((userGroup) => userGroup.group._id === id).group.title
        }/members`}
      >
        <Input
          width="25%"
          fontSize={1.6}
          label="Search"
          placeholder="search"
          name="search"
          type="text"
          float="right"
          handleChange={(e) => setSearch(e.target.value)}
        />
        {admin && (
          <Tab
            titles={[
              {
                text: "Accpeted",
                id: "acc",
                fct: () => {
                  setAccepted(true);
                },
                checked: accepted,
              },
              {
                text: "Pending",
                id: "pen",
                fct: () => {
                  setAccepted(false);
                },
                checked: !accepted,
              },
            ]}
          />
        )}
        <Table titles={titles}>
          {groupsUsers.map(
            ({ user, date, role, _id, postNumbers, joinDate }) => (
              <TableContainer clickable key={_id}>
                <TableItem
                  handleClick={() => router.push("/profile/" + user._id)}
                >
                  <Avatar
                    img={user.imageUrl}
                    title={user.name}
                    radius={50}
                    fontTitle="1.4rem"
                    color="#000"
                  />
                </TableItem>
                <TableItem
                  handleClick={() => router.push("/profile/" + user._id)}
                >
                  {user.email}
                </TableItem>
                {accepted && (
                  <TableItem
                    handleClick={() => router.push("/profile/" + user._id)}
                  >
                    {postNumbers}
                  </TableItem>
                )}
                <TableItem
                  handleClick={() => router.push("/profile/" + user._id)}
                >
                  {formatDates(joinDate || date)}
                </TableItem>
                {accepted && (
                  <TableItem
                    handleClick={() => router.push("/profile/" + user._id)}
                  >
                    {role}
                  </TableItem>
                )}
                {admin && user._id !== me._id && !user.isAdmin && (
                  <TableItem justifyContent="space-evenly">
                    <Options
                      relative
                      options={[
                        {
                          text: accepted
                            ? "Delete from group"
                            : "Delete request",
                          fct: () => deleteUserFromGroup(_id),
                        },
                        !accepted && {
                          text: "Accept request",
                          fct: () => acceptUserToGroup(_id),
                        },
                      ]}
                    />
                  </TableItem>
                )}
              </TableContainer>
            )
          )}
        </Table>
      </Main>
      <style jsx>{`
        .members__request {
          display: flex;
          align-items: center;
        }

        .member__request {
          flex: 1;
          background: #fff;
          text-align: center;
          padding: 1.5rem 0rem;
          font-size: 1.7rem;
          cursor: pointer;
          font-weight: 500;
        }
        .member__request:not(:last-child) {
          border-right: 1px solid rgba(0, 0, 0, 0.2);
          border-top-right-radius: 10px;
        }
      `}</style>
    </>
  ) : (
    <Loading text="Loading members" loadingPage font={1.5} />
  );
};

export default Members;

export const getServerSideProps = (ctx) => protectedPage(ctx);
