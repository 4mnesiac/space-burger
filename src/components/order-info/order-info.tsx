import React, { FC, useState } from 'react'
import styles from './order-info.module.css'
import { useAppParams, useAppDispatch, useAppSelector } from 'services/hooks'
import { OrderTitle, OrderFooter, OrderContent } from './parts'
import { formatOrderDate } from 'utils/formatDate'

import LoaderSpinner from 'components/loader/loader'
import { getOrderByIdApi } from 'services/api'
import { TingredientList, TOrder } from 'types/types'
import calculatePrice from 'utils/calculatePrice'

const OrderInfo: FC = () => {
  const [order, setOrder] = useState<TOrder | undefined>()
  const dispatch = useAppDispatch()
  const { id } = useAppParams()
  const { ingredients, isLoading } = useAppSelector((store) => store.ingredients)

  const orderIngredients =
    ingredients && order && order.ingredients.map((id) => ingredients.find((item) => item._id === id))
  const date = order && formatOrderDate(order.createdAt)

  const orderPrice =
    orderIngredients &&
    ingredients &&
    calculatePrice(orderIngredients);


  React.useEffect(() => {
    // dispatch(getIngredients())
    getOrderByIdApi(id)
      .then((res) => {
        setOrder(res.orders[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id, dispatch])

  return (
    <>
      {!isLoading && order ? (
        <article className={styles.card}>
          <p className={styles.id}>#{order.number}</p>
          <OrderTitle name={order.name} status={order.status} />
          <OrderContent ingredients={(orderIngredients as TingredientList)} />
          <OrderFooter datetime={(date as string)} price={(orderPrice as number)} />
        </article>
      ) : (
        <LoaderSpinner />
      )}
    </>
  )
}

export default OrderInfo
