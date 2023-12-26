/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: "",
}

const moduleCourses = createSlice({
    name: 'module',
    initialState,
    reducers: {
        updateId: (state, action) => {
            state.id = action.payload;
        },
        resetId: (state) => {
            state.id = "";
        }
    }
});


export const {updateId, resetId} = moduleCourses.actions;
export default moduleCourses.reducer