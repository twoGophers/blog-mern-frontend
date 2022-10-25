import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({imageAvatar, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      { imageAvatar ? (
        <img className={styles.avatar} src={ `/avatar/${imageAvatar}`} alt={fullName} />
        ) : (
        <img className={styles.avatar} src={ '/noavatar.png'} alt={fullName} />
        )}
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
