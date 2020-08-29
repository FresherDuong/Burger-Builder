import React from 'react';
import burgerLogo from './../../assets/images/burger-logo.png';
import styles from './Logo.module.css';

// cant using src="./../../assets/images/burger-logo.png", because when Webpack
// bundles all together, it doesn't know exactly folder"./../../assets/images/burger-logo.png"

const logo = (props) => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="Burger Builder" />
  </div>
);

export default logo;
