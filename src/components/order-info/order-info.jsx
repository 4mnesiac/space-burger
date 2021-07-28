import React, { useState } from 'react';
import styles from './order-info.module.css';
import { useParams } from 'react-router-dom'
import { OrderTitle, OrderFooter, OrderContent } from './parts';
import { useDispatch, useSelector } from 'react-redux';
import { formatOrderDate } from 'utils/formatDate';
import { getIngredients } from 'services/slices/ingredientsSlice';
import LoaderSpinner from 'components/loader/loader';
import { getOrderByIdApi } from 'services/api';

const OrderInfo = () => {
    const [order, setOrder] = useState()
    const dispatch = useDispatch();
    const { id } = useParams();
    const { ingredients } = useSelector(store => store.ingredients)

    const orderIngredients = ingredients && order &&
        order.ingredients.map((id) =>
            ingredients.find((item) => item._id === id)
        );
    const date = order && formatOrderDate(order.createdAt)

    const orderPrice =
        orderIngredients &&
        ingredients &&
        orderIngredients.reduce(function (prevValue, item) {
            return prevValue + item.price;
        }, 0);

    React.useEffect(() => {
        dispatch(getIngredients());
        getOrderByIdApi(id)
            .then((res) => {
                setOrder(res.orders[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, dispatch]);

    return (
        <>
            {order ? (
                <article className={styles.card}>
                    <p className={styles.id}>#{order.number}</p>
                    <OrderTitle id={order._id} name={order.name} status={order.status} />
                    <OrderContent ingredients={orderIngredients} />
                    <OrderFooter datetime={date} price={orderPrice} />
                </article>
            ) : (
                <LoaderSpinner />
            )}
        </>
    );
};

export default OrderInfo;
