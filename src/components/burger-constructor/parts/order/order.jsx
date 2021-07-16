import React from 'react';
import orderStyles from './order.module.css'
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from '../../../order-details/order-details';
import Modal from '../../../modal/modal';
import { clearOrder, setOrder } from 'services/slices/orderSlice';
import { closeOrderModal, openOrderModal } from 'services/slices/modalSlice';
import { resetCart } from 'services/slices/cartSlice';

const Order = () => {
    const { isOrderModalOpen } = useSelector(store => store.modal)
    const { total } = useSelector(store => store.cart);
    const { itemsToOrder } = useSelector(store => store.cart)
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        // дизейблим кнопку если конструктор пуст
        if (itemsToOrder.length) {
            dispatch(setOrder(itemsToOrder))
            dispatch(openOrderModal())
        }
    };

    const handleCloseModal = () => {
        dispatch(closeOrderModal())
        dispatch(resetCart())
        dispatch(clearOrder())
    };

    return (
        <div className={orderStyles.order}>
            <span className={orderStyles.price}>
                {total}&nbsp;<CurrencyIcon type="primary" />
            </span>
            <Button onClick={handleOpenModal}>Оформить заказ</Button>
            {isOrderModalOpen &&
                (
                    <Modal name="Order" onClose={handleCloseModal}>
                        <OrderDetails />
                    </Modal>
                )
            }
        </div>
    )
}
export default Order;
