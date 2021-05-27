import React from 'react';
import modalStyles from './order-modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactComponent as OrderDone } from '../../../../images/order-done.svg';


export default class OrderModal extends React.Component {

    render() {
        return (
            <div className={modalStyles.modal}>
                <span className={modalStyles.close} onClick={this.props.toClose}>
                    <CloseIcon />
                </span>
                <span className={modalStyles.order_number}>
                    0345467
                        </span>
                <span className={modalStyles.subtitle}>идентификатор заказа</span>
                <span className={modalStyles.icon} onClick={this.handleClose}>
                    <OrderDone />
                </span>
                <p className={modalStyles.text}>Ваш заказ начали готовить</p>
                <p className={`${modalStyles.text} ${modalStyles.text_secondary}`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        )
    }
}