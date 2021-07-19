import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-dashboard.module.css';

export const OrderDashboard = ({ orderData }) => {

    const readyOrders = orderData.filter(item => item.status === "ready");
    const inProgressOrders = orderData.filter(item => item.status === "inprogress");

    return (
        <section className={styles.dashboard}>
            <article className={styles.orders}>
                <div className={styles.content}>
                    <div className={styles.content_item}>
                        <header className={styles.row__title}>Готовы: </header>
                        <ul className={styles.list}>
                            {readyOrders.map((item) => (
                                <li key={item.id} className={styles.ready}>{item.id}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.content_item}>
                        <header className={styles.row__title}>В работе: </header>
                        <ul className={styles.list}>
                            {inProgressOrders.map(item => (
                                <li key={item.id} className={styles.inprogress}>{item.id}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={styles.row}>
                    <header className={styles.row__title}>Выполнено за все время:</header>
                    <p className={styles.row__content}>26435</p>
                </div>
                <div className={styles.row}>
                    <header className={styles.row__title}>Выполнено за сегодня:</header>
                    <p className={styles.row__content}>123</p>
                </div>
            </article>
        </section>
    );
};

OrderDashboard.propTypes = {
    orderData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            ingredientIDs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            price: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired
}
