import React, { FC } from 'react'
import Modal from '../modal/modal'
import { useAppSelector } from 'services/hooks'
import styles from './order-item-details.module.css'
import { formatOrderDate } from 'utils/formatDate'
import { OrderContent, OrderFooter, OrderTitle } from 'components/order-info/parts'
import { TIngredient, TingredientList, TOrder } from 'types/types'

interface IOrderItemDetails {
  onClose: () => void
}
const OrderItemDetails: FC<IOrderItemDetails> = ({ onClose }) => {
  const { ingredients } = useAppSelector((store) => store.ingredients)
  const { orderToShow } = useAppSelector((store) => store.order)
  const { name, status, number, createdAt } = orderToShow as TOrder

  const orderIngredients =
    ingredients &&
    orderToShow &&
    (orderToShow as TOrder).ingredients.map((id) => ingredients.find((item) => item._id === id))
  const date = orderToShow && formatOrderDate(createdAt)

  const orderPrice =
    orderIngredients &&
    ingredients &&
    orderIngredients.reduce(function (prevValue, item) {
      return prevValue + (item as TIngredient).price
    }, 0)

  return (
    <Modal name='Details' title={`#${number}`} onClose={onClose} titleType='id'>
      <article className={styles.card}>
        <OrderTitle name={name} status={status} />
        <OrderContent ingredients={(orderIngredients as TingredientList)} />
        <OrderFooter datetime={(date as string)} price={(orderPrice as number)} />
      </article>
    </Modal>
  )
}

export default OrderItemDetails
