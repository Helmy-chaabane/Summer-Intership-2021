import { useState, useEffect, useContext } from "react";
import { NotificationContext } from "../../context/notificationContext";
import Typography from "../typography/Typography";
import StyleSheet from "./notification.module.scss";

const Notification = ({}) => {
  const [animationPause, setAnimationPause] = useState(false);
  const {
    notification: { lunchNotification, closable, duration, message, state },
    setNotification,
  } = useContext(NotificationContext);

  useEffect(() => {
    let aniamtionTimer;
    if (!closable && lunchNotification) {
      aniamtionTimer = setInterval(() => {
        setAnimationPause((prev) => !prev);
      }, duration * 0.5);
    } else if (closable && lunchNotification) {
      aniamtionTimer = setTimeout(() => {
        setAnimationPause((prev) => !prev);
      }, duration * 0.5);
    }

    return () => {
      closable ? clearTimeout(aniamtionTimer) : clearInterval(aniamtionTimer);
    };
  }, [lunchNotification, duration, closable]);

  return lunchNotification ? (
    <div className={StyleSheet.notification}>
      <div
        className={StyleSheet.notification__container}
        style={{
          animationPlayState: animationPause ? "paused" : "running",
          animationDuration: `${duration}ms`,
          backgroundColor: state.color,
        }}
        onAnimationEnd={() =>
          setNotification((prev) => ({
            ...prev,
            lunchNotification: !lunchNotification,
          }))
        }
      >
        <Typography title={state.title} fontSize="1.9rem" color="#fff" />
        <p className={StyleSheet.notification__message}>{message}</p>

        {closable && (
          <i
            className={[
              "fa fa-times fa-x2",
              StyleSheet.notification__close,
            ].join(" ")}
            onClick={() => setAnimationPause((prev) => !prev)}
          />
        )}
      </div>
    </div>
  ) : null;
};

export default Notification;
