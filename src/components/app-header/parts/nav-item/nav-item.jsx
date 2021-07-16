import React from "react";
import navItemStyles from './nav-item.module.css';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

export default function NavItem ({text, link, children}) {
    return (
      <NavLink to={link} className={navItemStyles.link} activeClassName={navItemStyles.active} exact>
        <span className={navItemStyles.icon}>
          {children}
        </span>
        <p className={navItemStyles.text}>{text}</p>
      </NavLink>
    );
  
}
NavItem.propTypes = {
  children: PropTypes.element.isRequired,
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}
