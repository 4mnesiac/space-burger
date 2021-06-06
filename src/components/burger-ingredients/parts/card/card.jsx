import React from 'react';
import cardStyles from './card.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import Modal from '../../../modal/modal'

const Card = ({ item, count }) => {
    const [isIngModalOpen, setIsIngModalOpen] = React.useState(false)
    const [ingredientToShow, setIngredientToShow] = React.useState({})
    const openIngModal = (data) => {
        setIsIngModalOpen(true)
        setIngredientToShow(data)
    }
    const handleClose = (e) => {
        e.stopPropagation();
        setIngredientToShow({})
        setIsIngModalOpen(false);
    };
    return (
        <article className={cardStyles.item} key={item._id} onClick={() => openIngModal(item)}>
            {count > 0 && <Counter count={count} />}
            <picture className={cardStyles.picture}>
                <source media="(max-width: 767px)" srcSet={item.image_mobile} />
                <source media="(min-width: 768px)" srcSet={item.image_large} />
                <img className={cardStyles.image} src={item.image} alt={item.name} />
            </picture>
            <span className={cardStyles.price}>{item.price}&nbsp;<CurrencyIcon type="primary" /></span>
            <p className={cardStyles.text}>{item.name}</p>
            {isIngModalOpen && (
                <Modal title='Детали ингридиента' isOpen={isIngModalOpen} onClose={handleClose}>
                    <IngredientDetails ingredientToShow={ingredientToShow} />
                </Modal>)
            }
        </article>
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
    }).isRequired
}