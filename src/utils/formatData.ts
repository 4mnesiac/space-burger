import { TingredientList } from "types/types"

type TformatData =  (ids: string[], ingredients: TingredientList) => TingredientList


export const formatData: TformatData = (ids, ingredients) => {
  let arr = []
  for (let index = 0; index < ids.length; index++) {
    const element = ids[index]
    const ingr = ingredients.find((item) => item._id === element)
    if (ingr) arr.push(ingr)
  }
  return arr
}
