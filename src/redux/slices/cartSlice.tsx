import { createSlice } from "@reduxjs/toolkit";


function areObjectsEqual(a, b, ignore = []) {
    const keysA = Object.keys(a).filter(key => !ignore.includes(key));
    const keysB = Object.keys(b).filter(key => !ignore.includes(key));

    if (keysA.length !== keysB.length) return false;

    return keysA.every(key => a[key] === b[key]);
}
export type PizzaItem = {
    imageUrl: string,
    uid: number,
    price: number,
    title: string,
    type: string,
    size: number,
    count: number,
}

type CartState = {
    items: PizzaItem[],
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
        addItemtoCart(state, action) {
            const item = state.items.find(el => areObjectsEqual(el, action.payload, ["count", "uid"]))
            if (item) {
                item.count++
            } else {
                state.items.push({ ...action.payload, count: 1, uid: crypto.randomUUID() })
            }
            state.totalPrice += action.payload.price

            state.totalCount++
        },
        minusItemfromCart(state, action) {
            const item = state.items.find(item => action.payload.uid == item.uid)
            if (!item) return;
            if (item.count > 1) {
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
        removeItemFromCart(state, action) {
            state.items = state.items.filter(item => item.uid !== action.payload.uid)
            state.totalPrice -= action.payload.price * action.payload.count
            state.totalCount -= action.payload.count
        }
    }
})

export const selectCart = (state) => state.cartReducer;

export const { addItemtoCart, minusItemfromCart, clearCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer