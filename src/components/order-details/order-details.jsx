import React from 'react';
import orderDetailsStyles from './order-details.module.css';
import { ReactComponent as OrderDone } from '../../images/order-done.svg';
import PropTypes from 'prop-types';
import Modal from '../modal/modal'

export default function OrderDetails(props) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <span className={orderDetailsStyles.order_number}>
                0345467
            </span>
            <span className={orderDetailsStyles.subtitle}>идентификатор заказа</span>
            <span className={orderDetailsStyles.icon}>
                <OrderDone />
            </span>
            <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
            <p className={`${orderDetailsStyles.text} ${orderDetailsStyles.text_secondary}`}>Дождитесь готовности на орбитальной станции</p>
        </Modal>
    )
}
OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
}