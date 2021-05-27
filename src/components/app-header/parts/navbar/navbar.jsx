/* eslint-disable @typescript-eslint/no-useless-constructor */
import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavItem} from "../nav-item";
import navbarStyles from "./navbar.module.css";

export default class NavBar extends React.Component {
  render() {
    return (
        <nav className={navbarStyles.navbar}>
          <ul className={navbarStyles.nav_menu}>
            <li>
              <div className={navbarStyles.item_wrapper}>
                <NavItem text="Конструктор">
                    <BurgerIcon />
                </NavItem>
                <NavItem text="Лента заказов">
                    <ListIcon />
                </NavItem>
            </div>
            </li>
            <li className={navbarStyles.logo}>
              <Logo />
           </li>
            <li>
              <NavItem text="Личный кабинет">
                <ProfileIcon />
              </NavItem>
            </li>
          </ul>
        </nav>
    );
  }
}


