import React from 'react';
import orderDetailsStyles from './order-details.module.css';
import { ReactComponent as OrderDone } from '../../images/order-done.svg';
import { useSelector } from 'react-redux';
import LoaderSpinner from 'components/loader/loader';

export default function OrderDetails() {
    const { order, isLoading } = useSelector(store => store.order)
    return (
        <>
            <span className={orderDetailsStyles.order_number}>
                {order.success && order.order.number}
            </span>

            <span className={orderDetailsStyles.subtitle}>идентификатор заказа</span>
            {/* <span className={orderDetailsStyles.name}>{order.name}</span> */}
            <span className={orderDetailsStyles.icon}>
                {isLoading ? <LoaderSpinner type="light" /> : <OrderDone />}
            </span>
            <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
            <p className={`${orderDetailsStyles.text} ${orderDetailsStyles.text_secondary}`}>Дождитесь готовности на орбитальной станции</p>

        </>
    )
}
