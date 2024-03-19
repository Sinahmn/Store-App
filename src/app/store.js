import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../features/product/productSlice.js";
import cartSlice from "../features/cart/cartSlice.js";




const store = configureStore({
    reducer: {
        product: ProductSlice,
        cart: cartSlice

    }
});

export default store;