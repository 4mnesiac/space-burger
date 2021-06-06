import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tabs, Menu } from './parts';
import PropTypes from 'prop-types';


const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState('bun')

  return (
    <section className={ingredientsStyles.ingredients}>
      <h1 className={ingredientsStyles.title}>Соберите бургер</h1>
      <Tabs current={current} onClick={setCurrent} />
      <div className={ingredientsStyles.scroller}>
        <Menu data={data} current={current} />
      </div>
    </section>
  );
}
export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}