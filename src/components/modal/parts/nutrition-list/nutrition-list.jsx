import React from 'react';
import nutritionListStyles from './nutrition-list.module.css';
import {NutritionItem} from '../nutrition-item'


const NutritionList = (props) => {

    return (
        <ul className={nutritionListStyles.nutrition}>
            <NutritionItem title='Калории,ккал' data={props.data.calories} />
            <NutritionItem title='Белки, г' data={props.data.proteins} />
            <NutritionItem title='Жиры, г' data={props.data.fat} />
            <NutritionItem title='Углеводы, г' data={props.data.carbohydrates} />
        </ul>
    )
}
export default NutritionList;