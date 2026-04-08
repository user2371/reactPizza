import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const sortList = ["rating", "price", "title"]

export const fetchPizzasThunk = createAsyncThunk(
  'pizzasSlice/fetchPizzasById',
  async (params, { rejectWithValue }) => {
    const { category, sortBy, order, search, pageSize, page } = params;

    try {
      const res = await axios.get(
        `https://694f0a738531714d9bcd36d3.mockapi.io/items?category=${category}&sortBy=${sortList[sortBy]}&order=${order}&title=${search}&limit=${pageSize}&page=${page}`,
        {
          responseType: 'text',
          validateStatus: (status) => status >= 200 && status < 300 || status === 404
        }
      );

      // Fulfilled для "Not found"
      if (res.status === 404 && res.data === "Not found") {
        return "Not found";
      }

      // Fulfilled для даних
      try {
        return JSON.parse(res.data);
      } catch {
        return res.data;
      }
    } catch (err) {
      // Реальні помилки мережі, таймаути і т.д.
      return rejectWithValue(err.message);
    }
  }
);

type PizzasState = {
    pizzas: any[],
    status: "loading" | "success" | "error",
} 

const initialState: PizzasState = {
    pizzas: [],
    status: "loading", // loading | success | error
}
const pizzasSlice = createSlice({
    name: "pizzasSlice",
    initialState: initialState,
    reducers: {
        setPizzas(state, action) {
            state.pizzas = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzasThunk.pending, (state) => {
                state.status = "loading";
                state.pizzas = [];
            })
            .addCase(fetchPizzasThunk.fulfilled, (state, action) => {
                state.status = "success";
                state.pizzas = action.payload;
            })
            .addCase(fetchPizzasThunk.rejected, (state) => {
                state.status = "error";
                state.pizzas = [];
            });
    },
})

export const selectPizzas = (state) => state.pizzasReducer;
export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;