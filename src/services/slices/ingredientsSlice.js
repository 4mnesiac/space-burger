import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "components/app/app";

export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async () => {
        try {
            const response = await fetch(API + '/ingredients');
            if (!response.ok) {
                return Promise.reject('Failed response: ', response)
            }
            const ingredients = await response.json();
            if (ingredients.success) {
                return ingredients.data;
            } else {
                return Promise.reject(response)
            }
        } catch (error) {
            console.log('Catched error: ' + error.message)
            return Promise.reject(error.message)
        }
    }
)
export const initialState = {
    ingredients: [],
    ingredientToShow: {},
    isLoading: false,
    hasError: false,
}
export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setIngredientToShow: (state, action) => {
            state.ingredientToShow = action.payload;
        },
        resetIngredientToShow: (state) => {
            state.ingredientToShow = {};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getIngredients.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
          })
        .addCase(getIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase(getIngredients.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
            state.ingredients = [];
          })
        
    }
})

export const { setIngredientToShow, resetIngredientToShow } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;