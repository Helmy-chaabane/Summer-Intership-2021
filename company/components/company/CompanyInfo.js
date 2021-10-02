import StyleSheet from "./company.module.scss";

const CompanyInfo = ({ company }) => {
  return (
    <div className={StyleSheet.info}>
      {company?.email && (
        <div className={StyleSheet.info__info}>
          <svg className={StyleSheet.info__icon}>
            <use href="/sprites.svg#icon-envelop" />
          </svg>
          <span className={StyleSheet.info__text}>{company?.email}</span>
        </div>
      )}

      {company?.phone && (
        <div className={StyleSheet.info__info}>
          <svg className={StyleSheet.info__icon}>
            <use href="/sprites.svg#icon-phone" />
          </svg>
          <span className={StyleSheet.info__text}>{company?.phone} </span>
        </div>
      )}

      {company?.address && (
        <div className={StyleSheet.info__info}>
          <svg className={StyleSheet.info__icon}>
            <use href="/sprites.svg#icon-location" />
          </svg>
          <span className={StyleSheet.info__text}>{company?.address}</span>
        </div>
      )}
    </div>
  );
};

export default CompanyInfo;
