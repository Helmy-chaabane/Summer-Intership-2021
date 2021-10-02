import StyleSheet from "./grid.module.scss";

const Grid = ({
  children,
  numberOfcolumns = 1,
  sizeOfColumn = "1fr",
  columnGap = 10,
  rowGap = 10,
  padding = 20,
  classNames = [],
  ...rest
}) => {
  return (
    <>
      <div
        className={[StyleSheet.grid, ...classNames].join(" ")}
        style={{
          gridTemplateColumns: `repeat(${numberOfcolumns},${sizeOfColumn})`,
          columnGap,
          rowGap,
          padding,
          ...rest,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Grid;
