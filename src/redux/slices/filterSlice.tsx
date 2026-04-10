import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type FilterState = {
    activeCategory: number,
    sortBy: number,
    orderAsc: boolean,
    currentPage: number,
    search: string,
}

const initialState:FilterState = {
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
        setActiveCategory(state, action: PayloadAction<number>) {
            state.activeCategory = action.payload;
        },
        setSortBy(state, action: PayloadAction<number>) {
            state.sortBy = action.payload;
        },
        setOrderAsc(state, action: PayloadAction<boolean>) {
            state.orderAsc = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchString(state, action: PayloadAction<string>) {
            state.search = action.payload
        },
        setFilters(state, action: PayloadAction<FilterState>) {
            state.activeCategory = action.payload.activeCategory;
            state.sortBy = action.payload.sortBy;
            state.orderAsc = action.payload.orderAsc;
            state.currentPage = action.payload.currentPage;
            state.search = action.payload.search;
        }
    }
})

export const selectFilters = (state: RootState) => state.filterReducer;

export const { setActiveCategory, setSortBy, setOrderAsc, setCurrentPage, setFilters, setSearchString } = filterSlice.actions;
export default filterSlice.reducer;