import React from 'react';
import styles from './feed.module.css';
import FeedCard from '../feed-card/feed-card';
import { OrderDashboard } from 'components/order-dashboard/order-dashboard';
import ScrollContainer from 'components/scroll-container/scroll-container';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import wsActions from 'services/web-socket/wsActions';
import LoaderSpinner from 'components/loader/loader';

export default function FeedPage() {
    const dispatch = useDispatch();
    const {
        orders,
        wsConnected,
        hasError,
    } = useSelector((state) => state.feed);

    useEffect(() => {
        dispatch(wsActions.connect.wsConnectionInit('feed'));

        return () => {
            dispatch(wsActions.connect.wsConnectionClose());
        };
    }, [dispatch]);

    return (
        <>
            {!wsConnected && !hasError && <LoaderSpinner/> }
            {wsConnected && !hasError && (
                <>
                    <section className={styles.wrapper}>
                        <section className={styles.order_list}>
                            <h1 className={styles.heading}>Лента заказов</h1>
                            <ScrollContainer type='list' height='680px'>
                                {orders.map((item, index) => (
                                    <li className={styles.list_item} key={index}>
                                        <FeedCard item={item} />
                                    </li>
                                ))}
                            </ScrollContainer>
                        </section>

                        <OrderDashboard />
                    </section>
                </>
            )}
        </>
    )
}
