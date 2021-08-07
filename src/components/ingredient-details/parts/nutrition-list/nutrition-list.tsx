import React, { FC } from 'react';
import nutritionListStyles from './nutrition-list.module.css';
import { NutritionItem } from '../nutrition-item'

interface INutritionList {
    calories: number | undefined;
    proteins: number | undefined; 
    fat: number | undefined;
    carbohydrates: number | undefined;
}

const NutritionList: FC<INutritionList> = ({ calories, proteins, fat, carbohydrates }) => {
    return (
                <ul className={nutritionListStyles.nutrition}>
                    <NutritionItem title='Калории,ккал' value={(calories as number)} />
                    <NutritionItem title='Белки, г' value={(proteins as number)} />
                    <NutritionItem title='Жиры, г' value={(fat as number)} />
                    <NutritionItem title='Углеводы, г' value={(carbohydrates as number)} />
                </ul>
    )
}
export default NutritionList;
