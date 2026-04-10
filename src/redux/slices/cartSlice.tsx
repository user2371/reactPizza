import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaType } from "../../components/CartPizzaItem";
import { RootState } from "../store";


function areObjectsEqual(
    a: PizzaType,
    b: PizzaType,
    ignore: (keyof PizzaType)[] = []
) {
    const keysA = Object.keys(a) as (keyof PizzaType)[];
    const keysB = Object.keys(b) as (keyof PizzaType)[];

    const filteredA = keysA.filter(key => !ignore.includes(key));
    const filteredB = keysB.filter(key => !ignore.includes(key));

    if (filteredA.length !== filteredB.length) return false;

    return filteredA.every(key => a[key] === b[key]);
}


type CartState = {
    items: PizzaType[],
    totalPrice: number,
    totalCount: number,
}


const initialState: CartState = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        addItemtoCart(state, action: PayloadAction<PizzaType>) {
            const item = state.items.find(el => areObjectsEqual(el, action.payload, ["count", "uid"]))
            if (item && item.count) {
                item.count++
            } else {
                state.items.push({ ...action.payload, count: 1, uid: crypto.randomUUID() })
            }
            state.totalPrice += action.payload.price

            state.totalCount++
        },
        minusItemfromCart(state, action: PayloadAction<{ uid?: string, price: number }>) {
            const item = state.items.find(item => action.payload.uid == item.uid)
            if (!item) return;
            if (item.count && item.count > 1) {
                item.count--
                state.totalCount--
                state.totalPrice -= action.payload.price
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        },
        removeItemFromCart(state, action: PayloadAction<PizzaType>) {
            state.items = state.items.filter(item => item.uid !== action.payload.uid)
            if (action.payload.count) {
                state.totalPrice -= action.payload.price * action.payload.count
                state.totalCount -= action.payload.count
            }
        }
    }
})

export const cartSelector = (state: RootState) => state.cartReducer;

export const { addItemtoCart, minusItemfromCart, clearCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer