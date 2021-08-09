import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    isDetailsModalOpen: boolean;
    isOrderModalOpen: boolean;
}
export const initialState: IinitialState = {
    isDetailsModalOpen: false,
    isOrderModalOpen: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
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