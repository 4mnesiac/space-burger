import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "components/app/app";


export const setOrder = createAsyncThunk(
    'order/setOrder',
    async (ids) => {
        try {
            const response = await fetch(`${API}/orders`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ingredients: ids
                })
            })
            if (!response.ok) {
                throw new Error('Fetch error')
            }
            const order = await response.json()
            return order;
        } catch (error) {
            console.log(error)
        }
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState:{
        order: {},
        isLoading: false,
        hasError: false
    },
    reducers: {
        clearOrder: (state) => {
            state.order = {}
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(setOrder.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(setOrder.fulfilled, (state, action) => {
            state.order = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase(setOrder.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
            state.order = {};
          })
    }
})

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;