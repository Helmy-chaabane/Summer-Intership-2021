import Image from "next/image";
import Typography from "../typography/Typography";
import StyleSheet from "./avatar.module.scss";

const Avatar = ({
  img,
  title,
  subTitle,
  fontTitle = "2rem",
  fontSubTitle = "1.2rem",
  radius = 30,
  handleClick,
  color = "#fff",
  marginLeft = "0.5rem",
  ...rest
}) => {
  return (
    <div
      className={[
        StyleSheet.avatar,
        handleClick && StyleSheet.avatar__clickable,
      ].join(" ")}
      style={{ ...rest }}
      onClick={handleClick}
    >
      <Image
        src={img || "/user.png"}
        width={radius}
        height={radius}
        layout="fixed"
        alt="avatar"
        quality={50}
        placeholder="empty"
        className={StyleSheet.avatar__photo}
        style={{ marginLeft }}
      />
      <div className={StyleSheet.avatar__details}>
        <Typography
          title={title}
          fontSize={fontTitle}
          padding="0"
          color={color}
        />
        {subTitle && (
          <span
            className={StyleSheet.avatar__subTitle}
            style={{ fontSize: fontSubTitle }}
          >
            {subTitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default Avatar;
