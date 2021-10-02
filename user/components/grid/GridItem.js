import StyleSheet from "./grid.module.scss";

const GridItem = ({ children, handleClick, toucheble, shadow, ...rest }) => {
  return (
    <div
      className={[
        StyleSheet.item,
        toucheble && StyleSheet.item__toucheble,
        shadow && StyleSheet.item__shadow,
      ].join(" ")}
      onClick={toucheble ? handleClick : undefined}
      style={{ ...rest }}
    >
      {children}
    </div>
  );
};

export default GridItem;
