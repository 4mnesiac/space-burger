import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavItem} from "../nav-item";
import navbarStyles from "./navbar.module.css";



export default function NavBar() {
  const localName = localStorage.getItem('userName');
    return (
        <nav className={navbarStyles.navbar}>
          <ul className={navbarStyles.nav_menu}>
            <li>
              <div className={navbarStyles.item_wrapper}>
                <NavItem text="Конструктор" link={'/'}>
                    <BurgerIcon />
                </NavItem>
                <NavItem text="Лента заказов" link={'/feed'} >
                    <ListIcon />
                </NavItem>
            </div>
            </li>
            <li className={navbarStyles.logo}>
              <Logo />
           </li>
           <div className={navbarStyles.item_wrapper}>
            <li>
              <NavItem text={localName ? localName : 'Личный кабинет'} link='/profile'>
                <ProfileIcon />
              </NavItem>
            </li>
            </div>
          </ul>
        </nav>
    );
}


