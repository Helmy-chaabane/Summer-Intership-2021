import { useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { NotificationContext } from "../../context/notificationContext";
import Loading from "../loading/Loading";
import Avatar from "../avatar/Avatar";
import SeachUser from "./SearchUser";
import Typography from "../typography/Typography";
import { GROUP_USERS } from "../../apollo/Queries/userGroupQueries";
import { ROLES } from "../../constants/enums";
import StyleSheet from "./group.module.scss";
import {
  UPDATE_USERGROUP,
  INVITE_USERGROUP,
} from "../../apollo/Mutations/userGroupMutations";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../utils/notifications";

const GroupAdmins = ({ id, user }) => {
  const { setNotification } = useContext(NotificationContext);
  const { data, loading, refetch } = useQuery(GROUP_USERS, {
    variables: { group: id, accepted: true, role: ROLES.ADMIN },
    onError: (error) => ErrorNotification(setNotification, error),
  });
  const [inviteAdmin] = useMutation(INVITE_USERGROUP, {
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const [updateUserGroup] = useMutation(UPDATE_USERGROUP, {
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const removeAdmin = (ug) => {
    updateUserGroup({
      variables: {
        _id: ug._id,
        role: ROLES.USER,
      },
    });
    refetch();
    SuccessNotification(
      setNotification,
      `${ug.user.name} is no longer admin on this group!`,
      1600
    );
  };

  const addAdmin = (invited) => {
    inviteAdmin({
      variables: {
        user: invited._id,
        group: id,
        role: ROLES.ADMIN,
      },
      refetchQueries: [
        {
          query: GROUP_USERS,
          variables: {
            group: id,
            accepted: true,
            role: ROLES.ADMIN,
          },
        },
      ],
    });
    SuccessNotification(
      setNotification,
      `${invited.name} is an admin on this group!`,
      1600
    );
    refetch();
  };

  return (
    <>
      <div className="admins">
        <Typography
          title="Admins"
          fontSize="1.6rem"
          fontWeight="600"
          marginBottom="1rem"
        />
        {!loading && data ? (
          <ul className={StyleSheet.group__admins}>
            {data.groupUsers.map((userGroup) => (
              <li
                className={StyleSheet.group__admins__item}
                key={userGroup._id}
              >
                <Avatar
                  img={userGroup.user.imageUrl || "/user.png"}
                  radius={30}
                  title={userGroup.user.name}
                  fontTitle="1rem"
                  color="#000"
                  marginRight="auto"
                />
                {!userGroup.user.isAdmin && (
                  <i
                    className={[
                      "fa fa-trash",
                      StyleSheet.group__admins__icon,
                    ].join(" ")}
                    onClick={() => removeAdmin(userGroup)}
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <Loading text="Loading admins" color="gray" font={0.6} />
        )}

        <SeachUser addingUser={addAdmin} idInput="admins" />
      </div>
      <style jsx>{`
        .admins {
          border: 1px solid rgba(0, 0, 0, 0.3);
          padding: 1rem;
        }
      `}</style>
    </>
  );
};

export default GroupAdmins;
