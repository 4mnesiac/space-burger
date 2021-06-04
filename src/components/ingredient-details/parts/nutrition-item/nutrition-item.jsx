import React from 'react';
import nutritionStyles from './nutrition-item.module.css'
import PropTypes from 'prop-types';

const NutritionItem = ({ title, value }) => {
    return (
        <li className={nutritionStyles.nutrition_item}>
            <p className={nutritionStyles.text}>{title}</p>
            <p className={nutritionStyles.value}>{value}</p>
        </li>
    )
}

export default NutritionItem;

NutritionItem.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
}