import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeCategory: 0,
    sortBy: 0,
    orderAsc: true,
    currentPage: 1,
    search: "",
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
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.activeCategory = action.payload.activeCategory;
            state.sortBy = action.payload.sortBy;
            state.orderAsc = action.payload.orderAsc;
            state.currentPage = action.payload.currentPage;
            state.search = action.payload.search;
        }
    }
})

export const { setActiveCategory, setSortBy, setOrderAsc, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;