import StyleSheet from "./button.module.scss";

const Button = ({
  title,
  handleClick,
  children,
  disabled,
  icon,
  hovered,
  type = "",
  ...rest
}) => {
  return (
    <button
      style={{ ...rest }}
      className={[
        StyleSheet.btn,
        disabled && StyleSheet.btn__disabled,
        hovered && StyleSheet.btn__hovered,
      ].join(" ")}
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon && (
          <i className={[`fa fa-${icon}`, StyleSheet.btn__icon].join(" ")} />
        )}
        {title}
      </div>
      {children}
    </button>
  );
};

export default Button;
