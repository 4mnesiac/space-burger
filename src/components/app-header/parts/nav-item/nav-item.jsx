import React from "react";
import navItemStyles from './nav-item.module.css';

export default class NavItem extends React.Component {

  render() {
    return (
      <a href="/" className={navItemStyles.link}>
        <span className={navItemStyles.icon}>
          {this.props.children}
        </span>
        <p className={navItemStyles.text}>{this.props.text}</p>
      </a>
    );
  }
}