import StyleSheet from "./table.module.scss";

const Container = ({ children, dark, clickable }) => {
  return (
    <tr
      className={[
        dark && StyleSheet.table__dark,
        clickable && StyleSheet.table__clickable,
      ].join(" ")}
    >
      {children}
    </tr>
  );
};

export default Container;
