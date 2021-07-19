import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-info.module.css';
import ScrollContainer from 'components/scroll-container/scroll-container';
import { OrderHeader, OrderItem, OrderFooter } from './parts';

const OrderInfo = ({ orderData }) => {
    const { id, name, datetime, status, price, ingredients } = orderData;
    return (
        <article className={styles.card}>
            <OrderHeader id={id} name={name} status={status} />
            <h3 className={styles.ingredients_title}>Состав:</h3>
            <ScrollContainer height='300px'>
                <ul className={styles.list}>
                    {ingredients.map((item, index) => (
                        <li className={styles.item} key={index}>
                            <OrderItem ingredient={item} price={price} />
                        </li>
                    ))}
                </ul>
            </ScrollContainer>
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