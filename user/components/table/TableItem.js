import StyleSheet from "./table.module.scss";

const Item = ({ children, handleClick }) => {
  return <td onClick={handleClick}>{children}</td>;
};

export default Item;
