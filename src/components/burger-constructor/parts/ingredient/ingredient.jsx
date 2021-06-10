import React from 'react';
import ingredientStyles from "./ingredient.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const Ingredient = ({item, type }) => {
    return ( 
        <div className={ingredientStyles.item_container}>
            <DragIcon type="primary" />
            <ConstructorElement
                type={type}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </div>
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
