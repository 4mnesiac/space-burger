import React, {FC} from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tabs, Menu } from './parts';
import { useAppDispatch } from 'services/hooks';
import { setIngredientToShow } from 'services/slices/ingredientsSlice';
import { openDetailsModal } from "services/slices/modalSlice";
import { TIngredient } from "types/types";


const BurgerIngredients: FC = () => {
  const [current, setCurrent] = React.useState('bun')
  const dispatch = useAppDispatch();

  const handleOpenModal = (item: TIngredient):void => {
    dispatch(setIngredientToShow(item))
    dispatch(openDetailsModal())
  }

  return (
    <section className={ingredientsStyles.ingredients}>
      <h1 className={ingredientsStyles.title}>Соберите бургер</h1>
      <Tabs current={current} />
      <Menu setCurrent={setCurrent} onClick={handleOpenModal} />
    </section>
  );
}
export default React.memo(BurgerIngredients);