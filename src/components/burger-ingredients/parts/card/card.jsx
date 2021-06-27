import React from 'react';
import cardStyles from './card.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import Modal from '../../../modal/modal'
import { useDispatch, useSelector } from 'react-redux';
import { resetIngredientToShow, setIngredientToShow } from 'services/ingredientsSlice';
import { useDrag } from "react-dnd";
import { closeDetailsModal, openDetailsModal } from 'services/modalSlice';


const Card = ({ item }) => {
    const dispatch = useDispatch();
    const {isDetailsModalOpen} = useSelector(store => store.modal)
    const { counts } = useSelector(store => store.cart)
    //TODO: баг при открытии модалки ингредиента, количество модалок = количество ингридиентов.
    const openIngModal = React.useCallback(
        (item) => {
            dispatch(setIngredientToShow(item))
            dispatch(openDetailsModal())
        },
        [dispatch]
    );
    const handleClose = (e) => {
        e.stopPropagation();
        dispatch(resetIngredientToShow())
        dispatch(closeDetailsModal())
    };
    const [, dragRef] = useDrag({
        type: "ingredients",
        item: {item},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    return (
        <article className={cardStyles.item} key={item._id} onClick={() => openIngModal(item)} ref={dragRef}>
            {counts[item._id] > 0 && <Counter count={counts[item._id]} />}
            <picture className={cardStyles.picture}>
                <source media="(max-width: 767px)" srcSet={item.image_mobile} />
                <source media="(min-width: 768px)" srcSet={item.image_large} />
                <img className={cardStyles.image} src={item.image} alt={item.name} />
            </picture>
            <span className={cardStyles.price}>{item.price}&nbsp;<CurrencyIcon type="primary" /></span>
            <p className={cardStyles.text}>{item.name}</p>
            {isDetailsModalOpen && (
                <Modal name="Details" title='Детали ингридиента' onClose={handleClose}>
                    <IngredientDetails item={item}/>
                </Modal>)
            }
        </article>
    )
}
export default React.memo(Card);

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