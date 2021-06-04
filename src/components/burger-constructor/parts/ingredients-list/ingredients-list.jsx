import React from 'react';
import {Ingredient} from "../ingredient";
import ingredientsListStyles from './ingredients-list.module.css';
import PropTypes from 'prop-types';

const IngredientsList = ({data, type}) => {
    return (
        <ul className={ingredientsListStyles.main_container}>
            {data.map((item) => (
                    <Ingredient
                        key={item._id}
                        item={item}
                        type={type} 
                    />
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