import React from 'react';
import orderDetailsStyles from './order-details.module.css';
import { ReactComponent as OrderDone } from '../../images/order-done.svg';
import { useSelector } from 'react-redux';

export default function OrderDetails() {
    const { order, isLoading } = useSelector(store => store.order)
    return (
        <>
            <span className={orderDetailsStyles.order_number}>
                {order.success && order.order.number}
            </span>

            <span className={orderDetailsStyles.subtitle}>{isLoading ? 'загружаем...' : 'идентификатор заказа'}</span>
            {/* <span className={orderDetailsStyles.name}>{order.name}</span> */}
            <span className={orderDetailsStyles.icon}>
                <OrderDone />
            </span>
            <p className={orderDetailsStyles.text}>{order.success ? 'Ваш заказ начали готовить' : ''}</p>
            <p className={`${orderDetailsStyles.text} ${orderDetailsStyles.text_secondary}`}>{order.success ? 'Дождитесь готовности на орбитальной станции' : 'Дождитесь ответа оператора'}</p>
        </>
    )
}
