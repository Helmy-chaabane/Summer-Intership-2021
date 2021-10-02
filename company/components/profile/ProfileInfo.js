import StyleSheet from "./profile.module.scss";

const ProfileInfo = ({ user }) => {
  const { email, phone, location, diploma, job } = user;
  return (
    <div className={StyleSheet.info}>
      {email && (
        <div className={StyleSheet.info__info}>
          <svg className={StyleSheet.info__icon}>
            <use href="/sprites.svg#icon-envelop" />
          </svg>
          <span className={StyleSheet.info__text}>{email}</span>
        </div>
      )}

      {phone && (
        <div className={StyleSheet.info__info}>
          <svg className={StyleSheet.info__icon}>
            <use href="/sprites.svg#icon-phone" />
          </svg>
          <span className={StyleSheet.info__text}>{phone}</span>
        </div>
      )}

      {location && (
        <div className={StyleSheet.info__info}>
          <svg className={StyleSheet.info__icon}>
            <use href="/sprites.svg#icon-location" />
          </svg>
          <span className={StyleSheet.info__text}>{location}</span>
        </div>
      )}

      {diploma && (
        <div className={StyleSheet.info__info}>
          <svg className={StyleSheet.info__icon}>
            <use href="/sprites.svg#icon-certificate" />
          </svg>
          <span className={StyleSheet.info__text}>{diploma}</span>
        </div>
      )}
      {job && (
        <div className={StyleSheet.info__info}>
          <svg className={StyleSheet.info__icon}>
            <use href="/sprites.svg#icon-briefcase" />
          </svg>
          <span className={StyleSheet.info__text}>{job}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
