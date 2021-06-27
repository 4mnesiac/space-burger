import React from 'react';
import nutritionListStyles from './nutrition-list.module.css';
import { NutritionItem } from '../nutrition-item'
import { useSelector } from 'react-redux';


const NutritionList = () => {
    const { calories, proteins, fat, carbohydrates } = useSelector(store => store.ingredients.ingredientToShow)
    return (
        <ul className={nutritionListStyles.nutrition}>
            <NutritionItem title='Калории,ккал' value={calories} />
            <NutritionItem title='Белки, г' value={proteins} />
            <NutritionItem title='Жиры, г' value={fat} />
            <NutritionItem title='Углеводы, г' value={carbohydrates} />
        </ul>
    )
}
export default NutritionList;
