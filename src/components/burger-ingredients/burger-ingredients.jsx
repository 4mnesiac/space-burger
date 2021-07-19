import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tabs, Menu } from './parts';
import { useDispatch} from 'react-redux';
import { setIngredientToShow } from 'services/slices/ingredientsSlice';
import { openDetailsModal } from "services/slices/modalSlice";


const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun')
  const dispatch = useDispatch();

  const handleOpenModal = (item) => {
    dispatch(setIngredientToShow(item))
    dispatch(openDetailsModal())
  }

  return (
    <section className={ingredientsStyles.ingredients}>
      <h1 className={ingredientsStyles.title}>Соберите бургер</h1>
      <Tabs current={current} setCurrent={setCurrent} />
      <Menu current={current} setCurrent={setCurrent} onClick={handleOpenModal} />
    </section>
  );
}
export default React.memo(BurgerIngredients);