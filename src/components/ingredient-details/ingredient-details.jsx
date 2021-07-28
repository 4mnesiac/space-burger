import React from 'react';
import { useSelector } from 'react-redux';
import detailsModalStyles from './ingredient-details.module.css';
import { NutritionList } from './parts';
import { useParams } from 'react-router-dom'
import LoaderSpinner from 'components/loader/loader';

function IngredientDetails() {
    const { id } = useParams();
    const { ingredients } = useSelector(store => store.ingredients);
    const activeIngredientFromStore = useSelector(store => store.ingredients.ingredientToShow);
    const activeIngredientFromUrl = id ? ingredients.find(item => item._id === id) : null;

    const activeIngredient = activeIngredientFromUrl || activeIngredientFromStore;
    return (
        <>
            {activeIngredient.name ? (
                        <div className={detailsModalStyles.detail}>
                        <picture className={detailsModalStyles.picture}>
                            <source media="(max-width: 768px)" srcSet={activeIngredient.image_mobile} />
                            <source media="(min-width: 1024px)" srcSet={activeIngredient.image_large} />
                            <img src={activeIngredient.image} alt={activeIngredient.name} className={detailsModalStyles.image} />
                        </picture>
                        <h3 className={detailsModalStyles.title}>{activeIngredient.name}</h3>
                        <NutritionList {...activeIngredient} />
                    </div>
            ) : (<LoaderSpinner />)
            }
        </>

    )
}
export default IngredientDetails;

