const Item = ({ children, handleClick, ...rest }) => {
  return (
    <td onClick={handleClick} style={{ ...rest }}>
      {children}
    </td>
  );
};

export default Item;
