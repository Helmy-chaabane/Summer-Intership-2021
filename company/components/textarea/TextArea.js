import { useRef } from "react";
import StyleSheet from "./textarea.module.scss";

const TextArea = ({
  placeholder,
  handleChange,
  minHeight,
  border,
  value,
  defaultValue,
  ...rest
}) => {
  const ref = useRef();

  const auto_grow = () => {
    ref.current.style.height = calcHeight(ref.current.value) + "px";
  };
  function calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    let newHeight = minHeight + numberOfLineBreaks * 17 + 12 + 2;
    return newHeight;
  }

  return (
    <textarea
      className={[
        StyleSheet.textarea,
        border && StyleSheet.textarea__border,
      ].join(" ")}
      placeholder={placeholder}
      onChange={handleChange}
      name="textArea"
      rows="3"
      value={value}
      onInput={(e) => auto_grow(e)}
      ref={ref}
      defaultValue={defaultValue}
      style={{ ...rest, minHeight: minHeight + "px" }}
    />
  );
};

export default TextArea;
