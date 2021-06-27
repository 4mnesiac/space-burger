import React from 'react';
import detailsModalStyles from './ingredient-details.module.css';
import { NutritionList } from './parts';
import { useSelector } from 'react-redux';

function IngredientDetails() {
    const ingredientToShow = useSelector(store => store.ingredients.ingredientToShow)
    return (
            <div className={detailsModalStyles.detail}>
            <picture className={detailsModalStyles.picture}>
                <source media="(max-width: 768px)" srcSet={ingredientToShow.image_mobile} />
                <source media="(min-width: 1024px)" srcSet={ingredientToShow.image_large} />
                <img src={ingredientToShow.image} alt={ingredientToShow.name} className={detailsModalStyles.image} />
            </picture>
            <h3 className={detailsModalStyles.title}>{ingredientToShow.name}</h3>
            <NutritionList />
        </div>
        
    )

}
export default IngredientDetails;

