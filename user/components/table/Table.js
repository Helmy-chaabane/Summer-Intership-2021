import StyleSheet from "./table.module.scss";
import TableContainer from "./TableContainer";

const Table = ({ titles = [], children }) => {
  return (
    <table className={[StyleSheet.table].join(" ")}>
      <thead>
        <TableContainer>
          {titles.map((t, index) => (
            <th key={index}>{t}</th>
          ))}
        </TableContainer>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
