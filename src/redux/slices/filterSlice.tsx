import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store.tsx";

type FilterState = {
    activeCategory: number,
    sortBy: number,
    orderAsc: boolean,
    currentPage: number,
    searchString: string,
}
const initialState: FilterState = {
    activeCategory: 0,
    sortBy: 0,
    orderAsc: true,
    currentPage: 1,
    searchString: "",
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
        setSearchString(state, action) {
            state.searchString = action.payload
        },
        setFilters(state, action) {
            state.activeCategory = action.payload.activeCategory;
            state.sortBy = action.payload.sortBy;
            state.orderAsc = action.payload.orderAsc;
            state.currentPage = action.payload.currentPage;
            state.searchString = action.payload.search;
        }
    }
})

export const selectFilters = (state: RootState):FilterState => state.filterReducer;
export const { setActiveCategory, setSortBy, setOrderAsc, setCurrentPage, setFilters, setSearchString } = filterSlice.actions;
export default filterSlice.reducer;