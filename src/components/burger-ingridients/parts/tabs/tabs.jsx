import React from 'react';
import tabStyles from './tabs.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

export default function Tabs({ current, onClick }) {

  return (
    <div className={tabStyles.tab_container}>
      <Tab value="bun" active={current === 'bun'} onClick={onClick}>Булки</Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={onClick}>Соусы</Tab>
      <Tab value="main" active={current === 'main'} onClick={onClick}>Начинки</Tab>
    </div>
  );
}

Tabs.propTypes = {  
  current: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
