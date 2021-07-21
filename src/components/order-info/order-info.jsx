import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-info.module.css';
import { useHistory } from 'react-router-dom'
import { OrderTitle, OrderFooter, OrderContent } from './parts';

const OrderInfo = ({ orderData, isModal = false }) => {
    const { id, name, datetime, status, price, ingredients } = orderData;
    // const history = useHistory()
    // let pushLocation = history.action === 'PUSH';

    return (
        <article className={styles.card}>
            {!isModal && <p className={styles.id}>#{id}</p>}
            <OrderTitle id={id} name={name} status={status} />
            <OrderContent ingredients={ingredients} price={price} />
            <OrderFooter datetime={datetime} price={price} />
        </article>
    );
};

export default OrderInfo;

OrderInfo.propTypes = {
    orderData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        datetime: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        ingredients: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
            })).isRequired,
    }).isRequired
};