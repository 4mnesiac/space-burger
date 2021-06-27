import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
const initialState = {
  sortedCart: {
    bun: {},
    fillers: [],
  },
  itemsToOrder: [],
  counts: {},
  total: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addIngredient: (state, action) => {

      const {item} = action.payload;
      // управляем счетчиком ингридиентов
      if (!state.counts[item._id]) {
        state.counts[item._id] = 1;
      } else {
        state.counts[item._id]++;
      }

      // сортируем
      if (item.type === 'bun') {
        const bunId = state.sortedCart.bun._id;
        state.counts[bunId] && state.counts[bunId]--
        state.sortedCart.bun = item;
      } else {
        const newFillers = [...state.sortedCart.fillers, {item, constructorId: nanoid()}]
        state.sortedCart.fillers = newFillers;
      }
      // добавляем данные для заказа
      state.itemsToOrder = state.sortedCart.bun._id ? state.sortedCart.fillers.map(el => el.item._id).concat([state.sortedCart.bun._id]) : state.sortedCart.fillers.map(el => el.item._id)
    },
    deleteIngredient: (state, action) => {
      const { id, itemIndex } = action.payload;
      const newFillers = [...state.sortedCart.fillers];
      newFillers.splice(itemIndex, 1);
      state.counts[id]--;
      state.sortedCart.fillers = newFillers;
      // обновляем данные для заказа
      state.itemsToOrder = state.sortedCart.fillers.map(el => el.item?._id).concat([state.sortedCart.bun._id])
    },
    resetCart: (state) => state = initialState,
    moveIngredient: (state, action) => {

      const { dragIndex, dropIndex } = action.payload;

      // state.sortedCart.fillers = newState.fillers.splice(
      //   dragIndex,
      //   0,
      //   newState.fillers.splice(dropIndex, 1)[0]
      // );
      // const dragItem = state.sortedCart.fillers[action.payload.dragIndex]
      // const dropTarget = state.sortedCart.fillers[action.payload.dropIndex]

      // newState.fillers.splice(dragIndex, 0, newState.fillers.splice(dropIndex, 1)[0])
      // state.sortedCart.fillers = newState.fillers

      // const newList = [...state.sortedCart.fillers]
      // const dragItem = state.sortedCart.fillers.slice()[action.payload.dragIndex];
      // const hoverItem = state.sortedCart.fillers.slice()[action.payload.dropIndex];
      // newList[action.payload.dropIndex] = dragItem;
      // newList[action.payload.dragIndex] = hoverItem;
      [state.sortedCart.fillers[dragIndex], state.sortedCart.fillers[dropIndex]] = [state.sortedCart.fillers[dropIndex], state.sortedCart.fillers[dragIndex]];

    },
    countTotal: (state) => {
      const fillers = state.sortedCart.fillers;
      state.total = state.sortedCart.bun.price 
      ? (fillers.reduce((acc, p) => acc + p.item.price, 0) + state.sortedCart.bun.price * 2)
      : (fillers.reduce((acc, p) => acc + p.item.price, 0));
    }
  },
})

export const { addIngredient, deleteIngredient, resetCart, countTotal, moveIngredient  } = cartSlice.actions;

export default cartSlice.reducer;
