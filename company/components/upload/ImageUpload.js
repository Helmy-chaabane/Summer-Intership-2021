import Image from "next/image";
import StyleSheet from "./upload.module.scss";
const ImageUplaod = ({ id, handleChange, image, error, ...rest }) => {
  return (
    <>
      <input
        id={id}
        name={id}
        type="file"
        onChange={handleChange}
        accept=".png, .jpg, .jpeg"
        directory="true"
        className={StyleSheet.imageUpload__field}
      />
      <label
        className={[
          StyleSheet.imageUpload,
          image && StyleSheet.imageUpload__borderless,
          error && StyleSheet.imageUpload__error,
        ].join(" ")}
        htmlFor={id}
        style={rest}
      >
        <i className={["fa fa-plus", StyleSheet.imageUpload__icon].join(" ")} />
        {image && (
          <Image
            alt="img_upload"
            layout="fill"
            objectFit="fill"
            quality={100}
            priority
            className={StyleSheet.imageUpload__image}
            src={image}
          />
        )}
        <span className={StyleSheet.imageUpload__cover}>
          <i
            className={[
              "fa fa-camera",
              StyleSheet.imageUpload__cover__cam,
            ].join(" ")}
          />
          <span>Update cover photo</span>
        </span>
      </label>
    </>
  );
};

export default ImageUplaod;
