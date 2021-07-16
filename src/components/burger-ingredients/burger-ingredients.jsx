import React, { useCallback } from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tabs, Menu } from './parts';
import { useDispatch, useSelector } from 'react-redux';
import { resetIngredientToShow, setIngredientToShow } from 'services/slices/ingredientsSlice';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal'
import { closeDetailsModal, openDetailsModal } from "services/slices/modalSlice";


const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun')
  const dispatch = useDispatch();
  const { isDetailsModalOpen } = useSelector(store => store.modal)

  const handleOpenModal = useCallback((item) => {
    dispatch(setIngredientToShow(item))
    dispatch(openDetailsModal())
  },[dispatch])

  const handleClose = useCallback((e) => {
    e.stopPropagation();
    dispatch(closeDetailsModal())
    dispatch(resetIngredientToShow())
  },[dispatch]);

  return (
    <section className={ingredientsStyles.ingredients}>
      <h1 className={ingredientsStyles.title}>Соберите бургер</h1>
      <Tabs current={current} setCurrent={setCurrent} />
      <Menu current={current} setCurrent={setCurrent} onClick={handleOpenModal} />
      {isDetailsModalOpen && (
        <Modal name="Details" title='Детали ингридиента' onClose={handleClose}>
          <IngredientDetails />
        </Modal>
      )
      }
    </section>
  );
}
export default React.memo(BurgerIngredients);