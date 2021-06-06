import React from 'react';
import detailsModalStyles from './ingredient-details.module.css';
import { NutritionList } from './parts';
import PropTypes from 'prop-types';

function IngredientDetails({ ingredientToShow }) {
    return (
        <div className={detailsModalStyles.detail}>
            <picture className={detailsModalStyles.picture}>
                <source media="(max-width: 768px)" srcSet={ingredientToShow.image_mobile} />
                <source media="(min-width: 1024px)" srcSet={ingredientToShow.image_large} />
                <img src={ingredientToShow.image} alt={ingredientToShow.name} className={detailsModalStyles.image} />
            </picture>
            <h3 className={detailsModalStyles.title}>{ingredientToShow.name}</h3>
            <NutritionList {...ingredientToShow} />
        </div>
    )

}
export default IngredientDetails;

IngredientDetails.propTypes = {
    ingredientToShow: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
    }).isRequired,
}
