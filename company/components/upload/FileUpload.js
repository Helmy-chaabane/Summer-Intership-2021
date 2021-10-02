import Stylesheet from "./upload.module.scss";

const FileUplaod = ({ id, icon: Icon, title, type, handleChange, ...rest }) => {
  return (
    <span className={Stylesheet.fileUpload}>
      <label htmlFor={id} className={Stylesheet.fileUpload__label}>
        <i
          className={["fa fa-image", Stylesheet.fileUpload__icon].join(" ")}
        ></i>
        <span className={Stylesheet.fileUpload__text}>{title}</span>
      </label>
      <input
        className={Stylesheet.fileUpload__field}
        type="file"
        id={id}
        directory="true"
        multiple
        accept={type === "image" && ".png, .jpg, .jpeg, .gif"}
        onChange={handleChange}
        {...rest}
      />
    </span>
  );
};

export default FileUplaod;
