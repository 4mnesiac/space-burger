import React from 'react';
import { Ingredient } from "../ingredient";
import ingredientsListStyles from './ingredients-list.module.css';
import { useSelector } from 'react-redux';

const IngredientsList = () => {
    const { fillers } = useSelector(store => store.cart.sortedCart);

    return (
        <ul className={ingredientsListStyles.main_container} >
            {fillers && fillers.map((el, index) =>
                <Ingredient
                    key={el.constructorId || el.item._id}
                    item={el.item}
                    id={el.item._id}
                    type={el.item.type}
                    index={index}
                />
            )
            }
        </ul>
    );
}

export default IngredientsList;
