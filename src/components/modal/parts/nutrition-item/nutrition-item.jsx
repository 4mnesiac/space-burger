import React from 'react';
import nutritionStyles from './nutrition-item.module.css'

const NutritionItem = ({ title, data }) => {
    return (
        <li className={nutritionStyles.nutrition_item}>
            <p className={nutritionStyles.text}>{title}</p>
            <p className={nutritionStyles.value}>{data}</p>
        </li>
    )
}

export default NutritionItem;