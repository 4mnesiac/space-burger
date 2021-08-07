import React, { FC, useMemo } from 'react'
import orderStyles from './order.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector, useAppDispatch } from '../../../../services/hooks'
import OrderDetails from '../../../order-details/order-details'
import Modal from '../../../modal/modal'
import { clearOrder, setOrder } from 'services/slices/orderSlice'
import { closeOrderModal, openOrderModal } from 'services/slices/modalSlice'
import { resetCart } from 'services/slices/cartSlice'
import { useHistory } from 'react-router-dom'

const Order: FC = () => {
  const { isAuthorized } = useAppSelector((store) => store.auth)
  const { isOrderModalOpen } = useAppSelector((store) => store.modal)
  const { total } = useAppSelector((store) => store.cart)
  const { fillers, bun } = useAppSelector((store) => store.cart.sortedCart)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const idArray = useMemo(() => {
    const orderItems = fillers.map((el) => el.item?._id)
    if (bun) {
      orderItems.push(bun?._id)
    }
    return orderItems
  }, [fillers, bun])

  const handleOpenModal = () => {
    if (!isAuthorized) {
      return history.replace('/login')
    }
    if (bun) {
      dispatch(setOrder(idArray))
      dispatch(openOrderModal())
    }
  }

  const handleCloseModal = () => {
    dispatch(closeOrderModal())
    dispatch(resetCart())
    dispatch(clearOrder())
  }

  return (
    <div className={orderStyles.order}>
      <span className={orderStyles.price}>
        {total}&nbsp;
        <CurrencyIcon type='primary' />
      </span>
      <Button onClick={handleOpenModal}>Оформить заказ</Button>
      {isOrderModalOpen && (
        <Modal name='Order' onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  )
}
export default Order
