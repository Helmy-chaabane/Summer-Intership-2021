import StyleSheet from "./tags.module.scss";

const Tags = ({ text, color }) => {
  return (
    <span className={StyleSheet.tag} style={{ backgroundColor: color }}>
      {text}
    </span>
  );
};

export default Tags;
