import { useState, useRef, useEffect } from "react";
import StyleSheet from "./options.module.scss";

const Options = ({ options = [], relative, rotate, ...rest }) => {
  const [visibility, setVisibility] = useState("hidden");
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setVisibility("hidden");
  };

  return (
    <div
      className={StyleSheet.options}
      onClick={() =>
        setVisibility((prev) => (prev === "hidden" ? "visible" : "hidden"))
      }
      style={{ position: relative && "relative", ...rest }}
      ref={node}
    >
      <div
        className={[
          StyleSheet.options__dots,
          rotate && StyleSheet.options__dots__rotate,
        ].join(" ")}
      >
        <span className={StyleSheet.options__dot}></span>
        <span className={StyleSheet.options__dot} />
        <span className={StyleSheet.options__dot} />
      </div>
      <div className={StyleSheet.options__wrapper} style={{ visibility }}>
        <div style={{ maxHeight: "30rem" }}>
          {options.map((opt, index) => (
            <div
              className={StyleSheet.options__opt}
              onClick={opt.fct}
              key={index}
            >
              {opt.text}
            </div>
          ))}
        </div>
        <div className={StyleSheet.options__wrapper__point}></div>
      </div>
    </div>
  );
};

export default Options;
