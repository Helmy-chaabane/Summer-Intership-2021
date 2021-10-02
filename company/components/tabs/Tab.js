import StyleSheet from "./tab.module.scss";

const Tab = ({ titles = [] }) => {
  return (
    <div className={StyleSheet.tab}>
      {titles.map((t, index) => (
        <label key={index} className={StyleSheet.tab__label}>
          <input
            className={StyleSheet.tab__input}
            id={t.id}
            name="tabs"
            type="radio"
            defaultChecked={t.checked}
          />
          <label
            className={StyleSheet.tab__text}
            htmlFor={t.id}
            onClick={t.fct}
          >
            {t.text}
          </label>
        </label>
      ))}
    </div>
  );
};

export default Tab;
