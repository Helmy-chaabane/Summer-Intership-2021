import StyleSheet from "./input.module.scss";

const Input = ({
  width,
  flex = 1,
  error,
  label,
  name,
  required,
  handleChange,
  icon: Icon,
  fontSize = 1.5,
  ...rest
}) => {
  return (
    <div className={StyleSheet.form__group}>
      <input
        id={name}
        style={{ width, flex, fontSize: `${fontSize}rem` }}
        onChange={handleChange}
        className={[
          StyleSheet.form__input,
          error && StyleSheet.form__input__error,
        ].join(" ")}
        {...rest}
      />
      <label
        htmlFor={name}
        style={{ fontSize: `${fontSize * 0.9}rem` }}
        className={[
          StyleSheet.form__label,
          required && StyleSheet.form__label__required,
          error && StyleSheet.form__label__error,
        ].join(" ")}
      >
        {Icon && <Icon style={StyleSheet.form__icon} />}
        {label}
      </label>
      {error && (
        <span
          className={StyleSheet.form__error}
          style={{ fontSize: `${fontSize * 0.75}rem` }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
