import React, { FC } from 'react';
import tabStyles from './tabs.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";


type TTab = {
  value: string;
  title:string;
}
const tabs: Array<TTab>  = [
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

interface ITabs {
  current: string;
}

const Tabs: FC<ITabs> = ({ current }) => {
  return (
    <div className={tabStyles.tab_container}>
      {tabs.map(({ value, title }) => (
        <Tab
          value={value}
          key={value}
          active={current === value}
          onClick={()=>{}}
        >
          {title}
        </Tab>
      ))}
    </div>
  );
}
export default React.memo(Tabs);

