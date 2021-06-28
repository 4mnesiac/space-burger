import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tabs, Menu } from './parts';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, resetIngredientToShow, setIngredientToShow } from 'services/ingredientsSlice';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal'
import { closeDetailsModal, openDetailsModal } from "services/modalSlice";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun')
  const dispatch = useDispatch();
  const { isDetailsModalOpen } = useSelector(store => store.modal)

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  const handleOpenModal = (item) => {
    dispatch(setIngredientToShow(item))
    dispatch(openDetailsModal())
}
  const handleClose = (e) => {
    e.stopPropagation();
    dispatch(closeDetailsModal())
    dispatch(resetIngredientToShow())
};

  return (
    <section className={ingredientsStyles.ingredients}>
      <h1 className={ingredientsStyles.title}>Соберите бургер</h1>
      <Tabs current={current} setCurrent={setCurrent} />
      <Menu current={current} setCurrent={setCurrent} onClick={handleOpenModal}/>
      {isDetailsModalOpen && (
        <Modal name="Details" title='Детали ингридиента' onClose={handleClose}>
          <IngredientDetails />
        </Modal>
      )
      }
    </section>
  );
}
export default BurgerIngredients;