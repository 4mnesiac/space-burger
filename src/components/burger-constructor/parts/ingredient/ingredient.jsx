import React from 'react';
import ingredientStyles from "./ingredient.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const Ingredient = ({item, type }) => {
    return ( 
        <li className={ingredientStyles.item_container} key={item._id}>
            <DragIcon type="primary" />
            <ConstructorElement
                type={type}
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </li>
    );
}
 
export default Ingredient;

Ingredient.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }),
    type: PropTypes.string,
}
