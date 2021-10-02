import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import ImageUpload from "../upload/ImageUpload";
import Typography from "../typography/Typography";
import { UPDATE_USER } from "../../apollo/Mutations/userMutations";
import {
  ErrorNotification,
  WarningNotification,
} from "../../utils/notifications";
import StyleSheet from "./profile.module.scss";

const ProfileInfo = ({ user, currentUser, setUser, setNotification }) => {
  const [image, setImage] = useState("");
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser }) =>
      setUser((prev) => ({ ...prev, imageUrl: updateUser.imageUrl })),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleImage = (e) => {
    const file = e.currentTarget.files[0];
    try {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          updateUser({
            variables: {
              _id: currentUser?._id,
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

  useEffect(() => {
    setImage(user?.imageUrl || "/user.png");
  }, [user, currentUser]);

  return (
    <div className={StyleSheet.profile}>
      {user?._id === currentUser?._id ? (
        <ImageUpload
          id="profile_image"
          handleChange={handleImage}
          image={image}
          width="18rem"
          height="18rem"
        />
      ) : (
        <Image
          src={user.imageUrl || "/user.png"}
          width={200}
          height={200}
          alt="profile img"
          layout="intrinsic"
          className={StyleSheet.profile__photo}
        />
      )}

      <div className={StyleSheet.profile__details}>
        <Typography title={user?.name} fontSize="1.6rem" padding="0rem" />
        <p className={StyleSheet.profile__descr}>{user.description}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
