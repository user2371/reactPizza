import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice"
import pizzasReducer from "./slices/pizzasSlice"
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        filterReducer: filterReducer,
        cartReducer: cartReducer,
        pizzasReducer: pizzasReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>