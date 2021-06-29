import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isDetailsModalOpen: false,
        isOrderModalOpen: false
    },
    reducers: {
        openDetailsModal: (state) => {
            state.isDetailsModalOpen = true
        },
        closeDetailsModal: (state) => {
            state.isDetailsModalOpen = false
        },
        openOrderModal: (state) => {
            state.isOrderModalOpen = true
        },
        closeOrderModal: (state) => {
            state.isOrderModalOpen = false
        },
    }
})

export const { openDetailsModal, closeDetailsModal, openOrderModal, closeOrderModal } = modalSlice.actions;
export default modalSlice.reducer;