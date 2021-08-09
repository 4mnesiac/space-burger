import React, { FC } from 'react'
import { Ingredient } from '../ingredient'
import ingredientsListStyles from './ingredients-list.module.css'
import { useAppSelector } from '../../../../services/hooks'

const IngredientsList: FC = () => {
  const { fillers } = useAppSelector((store) => store.cart.sortedCart)

  return (
    <ul className={ingredientsListStyles.main_container}>
      {fillers &&
        fillers.map((el, index) => <Ingredient key={el.constructorId || el.item._id} item={el.item} index={index} />)}
    </ul>
  )
}

export default IngredientsList
