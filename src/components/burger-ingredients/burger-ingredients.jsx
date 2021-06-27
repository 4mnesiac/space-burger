import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tabs, Menu } from './parts';
import { useDispatch } from 'react-redux';
import { getIngredients } from 'services/ingredientsSlice';

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun')
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <section className={ingredientsStyles.ingredients}>
      <h1 className={ingredientsStyles.title}>Соберите бургер</h1>
      <Tabs current={current} setCurrent={setCurrent} />
      <Menu current={current} setCurrent={setCurrent} />
    </section>
  );
}
export default BurgerIngredients;