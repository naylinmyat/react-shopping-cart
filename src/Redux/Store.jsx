import { configureStore } from "@reduxjs/toolkit"
import shopAndCartReducer from "../Features/ShopAndCartSlice"
import userReducer from"../Features/UserSlice"

export const store = configureStore({
    reducer: {
        shopAndCart: shopAndCartReducer,
        user: userReducer,
    }
})