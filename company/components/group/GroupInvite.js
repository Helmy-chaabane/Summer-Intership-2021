import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { NotificationContext } from "../../context/notificationContext";
import Avatar from "../avatar/Avatar";
import Typography from "../typography/Typography";
import { INVITE_USERGROUP } from "../../apollo/Mutations/userGroupMutations";
import StyleSheet from "./group.module.scss";
import { ROLES } from "../../constants/enums";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../utils/notifications";
import SeachUser from "./SearchUser";

const GroupInvite = ({ id }) => {
  const { setNotification } = useContext(NotificationContext);
  const [invitedUser, setInvitedUser] = useState([]);
  const [inviteUser] = useMutation(INVITE_USERGROUP, {
    onCompleted: ({ inviteUserGroup }) => {
      setInvitedUser((prev) => [...prev, inviteUserGroup.user]);
    },
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const addUserGroup = (invited) => {
    inviteUser({
      variables: { user: invited._id, group: id, role: ROLES.USER },
    });
    SuccessNotification(
      setNotification,
      `${invited.name} has beed invited to this group!`,
      1600
    );
  };

  return (
    <>
      <Typography title="Invite People" fontSize="1.7rem" fontWeight="600" />
      <div className={StyleSheet.group__invite}>
        <ul className={StyleSheet.group__invite__list}>
          {!!invitedUser.length &&
            invitedUser.map((user) => (
              <li className={StyleSheet.group__invite__item} key={user._id}>
                <Avatar
                  img={user.imageUrl || "/user.png"}
                  radius={30}
                  title={user.name}
                  fontTitle="1rem"
                  color="#000"
                />
              </li>
            ))}
        </ul>
        <SeachUser addingUser={addUserGroup} idInput="invite" />
      </div>
    </>
  );
};

export default GroupInvite;
