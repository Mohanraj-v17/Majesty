import { createSlice } from '@reduxjs/toolkit';

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

const updateCart = (state) => {
    // Calculate items price
    state.itemPrice = addDecimals(
        state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    // Calculate shipping price (If order is over $100 then free, else $10)
    state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

    // Calculate tax price (15% tax)
    state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));

    // Calculate total price
    state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
};

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItem: [], shippingAddress: {}, paymentMethod: 'Online Payment' };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItem.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItem = state.cartItem.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItem = [...state.cartItem, item];
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItem = state.cartItem.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartItems: (state) => {
            state.cartItem = [];
            return updateCart(state);
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;