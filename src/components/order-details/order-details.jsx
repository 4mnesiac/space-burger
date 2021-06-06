import React from 'react';
import orderDetailsStyles from './order-details.module.css';
import { ReactComponent as OrderDone } from '../../images/order-done.svg';

export default function OrderDetails() {
    return (
        <>
            <span className={orderDetailsStyles.order_number}>
                0345467
            </span>
            <span className={orderDetailsStyles.subtitle}>идентификатор заказа</span>
            <span className={orderDetailsStyles.icon}>
                <OrderDone />
            </span>
            <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
            <p className={`${orderDetailsStyles.text} ${orderDetailsStyles.text_secondary}`}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}
