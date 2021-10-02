import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { UserContext } from "../../context/userContext";
import { NotificationContext } from "../../context/notificationContext";
import GroupImage from "./GroupImage";
import GroupInvite from "./GroupInvite";
import GroupAdmins from "./GroupAdmins";
import GroupDetails from "./GroupDetails";
import { GridItem } from "../grid";
import Typography from "../typography/Typography";
import { ErrorNotification } from "../../utils/notifications";
import { UPDATE_GROUP } from "../../apollo/Mutations/groupMutations";
import { PRIVACY, ROLES } from "../../constants/enums";

const GroupInfos = ({
  id,
  img,
  members,
  postNumbers,
  privacy,
  pending,
  title,
  description,
  role,
}) => {
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [updateGroup] = useMutation(UPDATE_GROUP, {
    onError: (error) => ErrorNotification(setNotification, error),
  });

  return (
    <>
      <GridItem shadow overflow="hidden">
        <GroupImage
          updateGroup={updateGroup}
          img={img}
          id={id}
          postNumbers={postNumbers}
          members={members}
          role={role}
          description={description}
        />
      </GridItem>
      {role === ROLES.ADMIN && (
        <>
          <GridItem shadow padding="2rem 2rem 0rem">
            <GroupInvite id={id} />
          </GridItem>

          {privacy === PRIVACY.PRIVATE && (
            <GridItem shadow padding="2rem 2rem 0rem" minHeight="10rem">
              <Typography title="Moderation" fontSize="2rem" />
              <div
                onClick={() => router.push(`${id}/members`)}
                style={{ cursor: "pointer " }}
              >
                <Typography
                  title="Pending request"
                  fontSize="1.3rem"
                  float="left"
                />
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "pink",
                    fontSize: "12px",
                  }}
                >
                  {pending}
                </span>
              </div>
            </GridItem>
          )}

          <GridItem shadow padding="2rem 2rem 0rem">
            <Typography
              title="Settings"
              fontSize="1.7rem"
              fontWeight="600"
              marginBottom="2rem"
            />
            <GroupAdmins id={id} user={user} />
            <GroupDetails
              privacy={privacy}
              updateGroup={updateGroup}
              id={id}
              title={title}
              description={description}
            />
          </GridItem>
        </>
      )}
    </>
  );
};

export default GroupInfos;
