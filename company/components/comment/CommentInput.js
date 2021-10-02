import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { NotificationContext } from "../../context/notificationContext";
import Typography from "../typography/Typography";
import { CREATE_COMMENT } from "../../apollo/Mutations/commentMutations";
import StyleSheet from "./comment.module.scss";
import { ErrorNotification } from "../../utils/notifications";
import Avatar from "../avatar/Avatar";

const CommentInput = ({ post, user }) => {
  const { setNotification } = useContext(NotificationContext);
  const [text, setText] = useState("");
  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: () => setText(""),
    onError: (error) => ErrorNotification(setNotification, error),
    fetchPolicy: "no-cache",
  });

  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      createComment({
        variables: {
          post,
          user: user._id,
          text,
        },
      });
    }
  };

  return (
    <div className={StyleSheet.commentInput}>
      <Avatar
        img={user?.imageUrl || "/user.png"}
        radius={40}
        fontTitle="1.3rem"
        margin="0rem"
      />

      <form className={StyleSheet.commentInput__form} onSubmit={handleComment}>
        <input
          className={StyleSheet.commentInput__field}
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default CommentInput;
