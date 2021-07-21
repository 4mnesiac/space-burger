import React from 'react';
import styles from './feed.module.css';
import FeedCard from '../feed-card/feed-card';
import PropTypes from 'prop-types';
import { OrderDashboard } from 'components/order-dashboard/order-dashboard';
import ScrollContainer from 'components/scroll-container/scroll-container';

export default function FeedPage({ feedData, orderData }) {
 

    return (
        <section className={styles.wrapper}>
            <section className={styles.order_list}>
                <h1 className={styles.heading}>Лента заказов</h1>
                <ScrollContainer type='list' height='680px'>
                    {feedData.map((item, index) => (
                        <li className={styles.list_item} key={index}>
                            <FeedCard item={item} />
                        </li>
                    ))}
                </ScrollContainer>
            </section>

            <OrderDashboard orderData={orderData} />
        </section>
    );
}
FeedPage.propTypes = {
    feedData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            datetime: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            ingredients: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    image: PropTypes.string.isRequired,
                }).isRequired
            ).isRequired
        }).isRequired
    ).isRequired,

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



