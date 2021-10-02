import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { NotificationContext } from "../../context/notificationContext";
import Avatar from "../avatar/Avatar";
import Options from "../options/Options";
import { ErrorNotification } from "../../utils/notifications";
import { DELETE_COMMENT } from "../../apollo/Mutations/commentMutations";
import { relativeDate } from "../../utils/dates";
import StyleSheet from "./comment.module.scss";

const Comment = ({ _id, date, text, user, currentUserId }) => {
  const [show, setShow] = useState(false);
  const { setNotification } = useContext(NotificationContext);
  const router = useRouter();
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleDelete = () => {
    deleteComment({ variables: { _id } });
  };

  return (
    <div
      className={StyleSheet.comment}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Avatar
        img={user.imageUrl}
        radius={40}
        handleClick={() => router.push("/profile/" + user._id)}
      />
      <div className={StyleSheet.comment__wrapper}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={StyleSheet.comment__wrapper__des}>
            <span
              className={StyleSheet.comment__wrapper__user}
              onClick={() => router.push("/profile/" + user._id)}
            >
              {user.name}
            </span>
            {user._id === currentUserId && (
              <i
                className="fa fa-user"
                style={{
                  color: "#000",
                  fontSize: "1.2rem",
                  marginLeft: ".5rem",
                }}
              />
            )}
            <p className={StyleSheet.comment__paragraph}>{text}</p>
          </div>
          {show && (
            <Options
              relative
              options={[{ text: "Delete Comment", fct: () => handleDelete() }]}
            />
          )}
        </div>
        <span className={StyleSheet.comment__date}> {relativeDate(date)} </span>
      </div>
    </div>
  );
};

export default Comment;
