import React from "react";
import navItemStyles from './nav-item.module.css';
import PropTypes from 'prop-types';

export default function NavItem ({text, children}) {
    return (
      <a href="/" className={navItemStyles.link}>
        <span className={navItemStyles.icon}>
          {children && children}
        </span>
        <p className={navItemStyles.text}>{text}</p>
      </a>
    );
  
}
NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element
}