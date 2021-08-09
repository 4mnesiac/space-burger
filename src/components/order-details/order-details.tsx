import React, { FC } from 'react';
import orderDetailsStyles from './order-details.module.css';
import { ReactComponent as OrderDone } from '../../images/order-done.svg';
import { useAppSelector } from 'services/hooks';
import LoaderSpinner from 'components/loader/loader';
import {TOrder} from 'types/types'

const OrderDetails: FC = () => {
    const { order, isLoading } = useAppSelector(store => store.order)
    return (
        <>
            <span className={orderDetailsStyles.order_number}>
                {order  as TOrder && (order as TOrder).number}
            </span>

            <span className={orderDetailsStyles.subtitle}>идентификатор заказа</span>
            {/* <span className={orderDetailsStyles.name}>{(order as TOrder).name}</span> */}
            <span className={orderDetailsStyles.icon}>
                {isLoading ? <LoaderSpinner type="light" /> : <OrderDone />}
            </span>
            <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
            <p className={`${orderDetailsStyles.text} ${orderDetailsStyles.text_secondary}`}>Дождитесь готовности на орбитальной станции</p>

        </>
    )
}
export default OrderDetails