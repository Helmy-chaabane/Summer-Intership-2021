import { useState } from "react";
import { useRouter } from "next/router";
import Typography from "../typography/Typography";
import ImageUplaod from "../upload/ImageUpload";
import StyleSheet from "./group.module.scss";
import { WarningNotification } from "../../utils/notifications";
import { ROLES } from "../../constants/enums";

const GroupImage = ({
  id,
  updateGroup,
  img,
  members,
  postNumbers,
  role,
  description,
}) => {
  const router = useRouter();
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    const file = e.currentTarget.files[0];
    try {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          updateGroup({
            variables: {
              _id: id,
              image: file,
            },
          });
          setImage(e.target.result);
        };
      }
    } catch (error) {
      WarningNotification(setNotification, error.message, 1400, true);
    }
  };

  return (
    <>
      <ImageUplaod
        id="profile_image"
        handleChange={handleImage}
        image={image || img || "/group.png"}
        disabled={role !== ROLES.ADMIN}
      />
      <p className={StyleSheet.group__text}>{description}</p>
      <div className={StyleSheet.group__description}>
        <div
          className={StyleSheet.group__description__ctn}
          onClick={() => router.push(`/groups/${id}/members`)}
        >
          <span style={{ fontSize: "1.6rem" }}>{members}</span>
          <Typography fontSize="1.7rem" title="Members" />
        </div>
        <div className={StyleSheet.group__description__ctn}>
          <span style={{ fontSize: 16 }}>{postNumbers}</span>
          <Typography fontSize="1.7rem" title="Posts" />
        </div>
      </div>
    </>
  );
};

export default GroupImage;
