import React from 'react';
import tabStyles from './tabs.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const tabs = [
  {
    value: 'bun',
    title: 'Булки'
  },
  {
    value: 'main',
    title: 'Начинки'
  },
  {
    value: 'sauce',
    title: 'Соусы'
  },
]

function Tabs({ current }) {
  return (
    <div className={tabStyles.tab_container}>
      {tabs.map(({ value, title }) => (
        <Tab
          value={value}
          key={value}
          active={current === value}
        >
          {title}
        </Tab>
      ))}
    </div>
  );
}
export default React.memo(Tabs);

Tabs.propTypes = {
  current: PropTypes.string.isRequired,
}
