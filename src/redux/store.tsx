import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice.tsx";
import cartReducer from "./slices/cartSlice.tsx"
import pizzasReducer from "./slices/pizzasSlice.tsx"

export const store = configureStore({
    reducer: {
        filterReducer: filterReducer,
        cartReducer: cartReducer,
        pizzasReducer: pizzasReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;