import React from 'react';
import tabStyles from './tabs.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Tabs({ current, onClick }) {

  return (
    <div className={tabStyles.tab_container}>
      <Tab value="Булки" active={current === 'Булки'} onClick={onClick}>Булки</Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={onClick}>Соусы</Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={onClick}>Начинки</Tab>
    </div>
  );
}