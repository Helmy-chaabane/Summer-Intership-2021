import StyleSheet from "./loading.module.scss";

const Loading = ({ loadingPage, text, font = 0.6, color = "#00008b" }) => {
  return (
    <div
      className={[
        StyleSheet.loading,
        loadingPage && StyleSheet.loading__page,
      ].join(" ")}
    >
      <div className={StyleSheet.loading__wrapper} style={{ color }}>
        <span
          className={StyleSheet.loading__text}
          style={{ fontSize: `${font * 2}rem` }}
        >
          {text}
        </span>
        <span
          className={[StyleSheet.loading__dot, StyleSheet.loading__dot__1].join(
            " "
          )}
          style={{ width: `${font}rem`, height: `${font}rem` }}
        />
        <span
          className={[StyleSheet.loading__dot, StyleSheet.loading__dot__2].join(
            " "
          )}
          style={{ width: `${font}rem`, height: `${font}rem` }}
        />
        <span
          className={[StyleSheet.loading__dot, StyleSheet.loading__dot__3].join(
            " "
          )}
          style={{ width: `${font}rem`, height: `${font}rem` }}
        />
      </div>
    </div>
  );
};

export default Loading;
