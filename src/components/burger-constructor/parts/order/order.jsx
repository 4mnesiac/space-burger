import React from 'react';
import orderStyles from './order.module.css'
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import OrderDetails from '../../../order-details/order-details';

const Order = ({total}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };
    const handleCloseModal = () => {
        setIsOpen(false);
      };

    return (
        <div className={orderStyles.order}>
            <span className={orderStyles.price}>
                {total}&nbsp;<CurrencyIcon type="primary" />
            </span>
            <Button onClick={handleOpenModal}>Оформить заказ</Button>
            {isOpen && <OrderDetails isOpen={isOpen} onClose={handleCloseModal}/>}
        </div>
    )
}
export default Order;

Order.propTypes = {
    total: PropTypes.number.isRequired
}