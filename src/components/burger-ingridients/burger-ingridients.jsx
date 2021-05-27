import React from "react";
import ingridientsStyles from "./burger-ingridients.module.css";
import { Tabs, Menu } from './parts';
import Scrollbar from '../custom-scrollbar/custom-scrollbar'


const BurgerIngridients = (props) => {
  const [current, setCurrent] = React.useState('Все ингридиенты')

  return (
    <section className={ingridientsStyles.ingridients}>
      <h1 className={ingridientsStyles.title}>Соберите бургер</h1>
      <Tabs current={current} onClick={setCurrent} />
      <Scrollbar>
        <Menu data={props.data} current={current} />
      </Scrollbar>
    </section>
  );
}
export default BurgerIngridients;
