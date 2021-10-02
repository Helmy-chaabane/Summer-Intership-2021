import Typography from "../typography/Typography";
import StyleSheet from "./radiobox.module.scss";

const RadioBox = ({
  id,
  name,
  title,
  subTitle,
  handleChange,
  value,
  checked,
  ...rest
}) => {
  return (
    <div className={StyleSheet.radiobox} style={{ ...rest }}>
      <input
        className={StyleSheet.radiobox__field}
        id={id}
        name={name}
        onChange={handleChange}
        value={value}
        type="radio"
        checked={checked}
      />
      <label htmlFor={id} className={StyleSheet.radiobox__text}>
        <Typography title={title} fontSize="1.3rem" />
        {subTitle && (
          <p className={StyleSheet.radiobox__subText}> {subTitle} </p>
        )}
      </label>
      <label
        htmlFor={id}
        className={[
          StyleSheet.radiobox__circle,
          checked && StyleSheet.radiobox__circle__checked,
        ].join(" ")}
      />
    </div>
  );
};

export default RadioBox;
