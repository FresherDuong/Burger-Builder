import React from 'react';
import styles from './NavigationItem.module.css';
// Note styles.active
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
  <li className={styles.NavigationItem}>
    {/* "to" is attribute to determine where React should add active class to link */}
    <NavLink
      activeClassName={styles.active}
      to={props.link}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
