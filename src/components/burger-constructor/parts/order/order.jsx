import React, { useMemo } from 'react';
import orderStyles from './order.module.css'
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from '../../../order-details/order-details';
import Modal from '../../../modal/modal';
import { clearOrder, setOrder } from 'services/slices/orderSlice';
import { closeOrderModal, openOrderModal } from 'services/slices/modalSlice';
import { resetCart } from 'services/slices/cartSlice';
import { useHistory } from 'react-router-dom';


const Order = ({ onEmptyBun }) => {
    const { isAuthorized } = useSelector(store => store.auth)
    const { isOrderModalOpen } = useSelector(store => store.modal)
    const { total } = useSelector(store => store.cart);
    const { fillers, bun } = useSelector(store => store.cart.sortedCart)
    const dispatch = useDispatch();
    const history = useHistory();

    const idArray = useMemo(() => {
        const orderItems = fillers.map(el => el.item?._id)
        if (bun) {
            orderItems.push(bun?._id);
        }
        return orderItems;
    }, [fillers, bun]);

    const handleOpenModal = () => {
        if (!isAuthorized) {
            return history.replace('/login');
        }
        if (bun) {
            dispatch(setOrder(idArray))
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

