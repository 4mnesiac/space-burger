import { TIngredient, TingredientList } from "types/types"

 const calculatePrice = (ingredients: TingredientList): number => {
    return ingredients.reduce(function (prevValue, item) {
         return prevValue + (item.type === 'bun' ? (item as TIngredient).price * 2 : (item as TIngredient).price);
     }, 0);
}
export default calculatePrice;