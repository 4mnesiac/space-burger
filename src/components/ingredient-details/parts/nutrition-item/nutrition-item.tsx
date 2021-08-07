import React, { FC } from 'react';
import nutritionStyles from './nutrition-item.module.css'

interface INutrition {
    title: string;
    value: number;
}
const NutritionItem: FC<INutrition> = ({ title, value }) => {
    return (
        <li className={nutritionStyles.nutrition_item}>
            <p className={nutritionStyles.text}>{title}</p>
            <p className={nutritionStyles.value}>{value}</p>
        </li>
    )
}

export default NutritionItem;
