import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeCategory: 0,
    sortBy: 0,
    orderAsc: true,
}

const filterSlice = createSlice({
    name: "filterSlice",
    initialState: initialState,
    reducers: {
        setActiveCategory(state, action) {
            state.activeCategory = action.payload;
        },
        setSortBy(state, action) {
            state.sortBy = action.payload;
        },
        setOrderAsc(state, action) {
            state.orderAsc = action.payload;
        }
    }
})

export const { setActiveCategory, setSortBy, setOrderAsc } = filterSlice.actions;
export default filterSlice.reducer;