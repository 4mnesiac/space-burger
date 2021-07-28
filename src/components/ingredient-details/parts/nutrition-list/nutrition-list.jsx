import React from 'react';
import nutritionListStyles from './nutrition-list.module.css';
import { NutritionItem } from '../nutrition-item'
import PropTypes from 'prop-types';

const NutritionList = ({ calories, proteins, fat, carbohydrates }) => {
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

NutritionList.propTypes = {
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
}