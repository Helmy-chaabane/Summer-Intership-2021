import Stylesheet from "./typography.module.scss";
const Typography = ({ title, handleClick, ...rest }) => {
  return (
    <span
      className={Stylesheet.typography}
      style={{ ...rest }}
      onClick={handleClick}
    >
      {title}
    </span>
  );
};

export default Typography;
