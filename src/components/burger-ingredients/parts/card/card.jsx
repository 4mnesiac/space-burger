import React from 'react';
import cardStyles from './card.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom'


const Card = ({ item, onClick }) => {
    const location = useLocation()
    const { counts } = useSelector(store => store.cart)
    const [, dragRef] = useDrag({
        type: "ingredients",
        item: { item },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    return (
        <Link className={cardStyles.item} to={{
            pathname: `/ingredients/${item._id}`,
            state: { from: location.pathname, pushLocation: location }
        }}>
            <article key={item._id} onClick={() => onClick(item)} ref={dragRef}>
                {counts[item._id] > 0 && <Counter count={item.type === 'bun' ? counts[item._id] + 1 : counts[item._id]} />}
                <picture className={cardStyles.picture}>
                    <source media="(max-width: 767px)" srcSet={item.image_mobile} />
                    <source media="(min-width: 768px)" srcSet={item.image_large} />
                    <img className={cardStyles.image} src={item.image} alt={item.name} />
                </picture>
                <span className={cardStyles.price}>{item.price}&nbsp;<CurrencyIcon type="primary" /></span>
                <p className={cardStyles.text}>{item.name}</p>
            </article>
        </Link>
    )
}
export default Card;

Card.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired

}