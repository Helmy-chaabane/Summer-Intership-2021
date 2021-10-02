import Typography from "../typography/Typography";
import StyleSheet from "./popup.module.scss";

const Popup = ({ title, show, handleShow, children }) => {
  return show ? (
    <div className={StyleSheet.popup}>
      <div className={StyleSheet.popup__container}>
        <Typography title={title} fontSize="2rem" marginBottom="1rem" />
        {children}
        <i
          className={["fa fa-times fa-x2", StyleSheet.popup__close].join(" ")}
          onClick={handleShow}
        />
      </div>
    </div>
  ) : null;
};

export default Popup;
