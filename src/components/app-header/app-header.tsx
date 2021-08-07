import React, { FC } from 'react'
import { NavBar } from './parts'
import headerStyles from './app-header.module.css'

const AppHeader: FC = () => {
  return (
    <header className={headerStyles.header}>
      <NavBar />
    </header>
  )
}
export default AppHeader
