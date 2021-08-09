import React, { FC } from 'react'
import navItemStyles from './nav-item.module.css'
import { NavLink } from 'react-router-dom'

type TNavItemProps = {
  text: string
  link: string
}

const NavItem: FC<TNavItemProps> = ({ text, link, children }) => {
  return (
    <NavLink to={link} className={navItemStyles.link} activeClassName={navItemStyles.active} exact>
      <span className={navItemStyles.icon}>{children}</span>
      <p className={navItemStyles.text}>{text}</p>
    </NavLink>
  )
}
export default NavItem
