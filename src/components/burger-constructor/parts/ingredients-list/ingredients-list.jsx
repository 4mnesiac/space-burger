import React from 'react';
import { Ingredient } from "../ingredient";
import ingredientsListStyles from './ingredients-list.module.css';
import PropTypes from 'prop-types';

const IngredientsList = ({ data, type }) => {
    return (
        <ul className={ingredientsListStyles.main_container}>
            {data.map((item) => (
                <li className={ingredientsListStyles.list_item} key={item._id}>
                    <Ingredient
                        item={item}
                        type={type}
                    />
                </li>
            ))
            }
        </ul>
    );
}

export default IngredientsList;

IngredientsList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired).isRequired
}