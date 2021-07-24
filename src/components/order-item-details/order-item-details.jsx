import PropTypes from "prop-types";
import React from "react";
import Modal from "../modal/modal";
import { useSelector } from "react-redux";
import styles from './order-item-details.module.css'
import { formatOrderDate } from "utils/formatDate";
import { OrderContent, OrderFooter, OrderTitle } from "components/order-info/parts";


function OrderItemDetails({onClose}) {
    const { ingredients } = useSelector(store => store.ingredients)
    const { orderToShow } = useSelector(store => store.order)
    const {name, _id, status, number, createdAt} = orderToShow;

    const orderIngredients = ingredients && orderToShow &&
    orderToShow.ingredients.map((id) =>
            ingredients.find((item) => item._id === id)
        );
    const date = orderToShow && formatOrderDate(createdAt)

    const orderPrice =
    orderIngredients &&
    ingredients &&
    orderIngredients.reduce(function (prevValue, item) {
        return prevValue + item.price;
    }, 0);
    
    return (
        <Modal name="Details" title={`#${number}`} onClose={onClose} titleType='id' >
            <article className={styles.card}>
                <OrderTitle id={_id} name={name} status={status} />
                <OrderContent ingredients={orderIngredients} />
                <OrderFooter datetime={date} price={orderPrice} />
            </article>
        </Modal >
    )
}

OrderItemDetails.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default OrderItemDetails;