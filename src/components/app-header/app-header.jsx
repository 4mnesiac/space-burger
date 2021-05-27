import React from "react";
import {NavBar} from './parts';
import headerStyles from "./app-header.module.css";

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.header}>
        <NavBar/>
      </header>
    );
  }
}