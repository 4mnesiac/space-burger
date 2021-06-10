import React from "react";
import {NavBar} from './parts';
import headerStyles from "./app-header.module.css";

export default function AppHeader() {
    return (
      <header className={headerStyles.header}>
        <NavBar/>
      </header>
    );
}