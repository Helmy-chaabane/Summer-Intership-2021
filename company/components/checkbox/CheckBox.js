import StyleSheet from "./checkbox.module.scss";

const CheckBox = ({ id, title, handleCheck, error, ...rest }) => {
  return (
    <>
      <div className={StyleSheet.checkbox}>
        <input
          id={id}
          {...rest}
          onChange={handleCheck}
          className={StyleSheet.checkbox__field}
          type="checkbox"
        />
        <label
          htmlFor={id}
          className={[
            StyleSheet.checkbox__label,
            error && StyleSheet.checkbox__label__error,
          ].join(" ")}
        >
          <i className={["fa fa-check", StyleSheet.checkbox__icon].join(" ")} />
        </label>
        <label htmlFor={id} className={StyleSheet.checkbox__text}>
          {title}
        </label>
      </div>
      {error && <span className={StyleSheet.checkbox__error}>{error}</span>}
    </>
  );
};

export default CheckBox;
