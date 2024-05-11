import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'
import { instockProducts, boughtHistoryProducts } from "../Data";

let signInUserName;

if (JSON.parse(localStorage.getItem('SignInUser')) !== null) {
    signInUserName = JSON.parse(localStorage.getItem('SignInUser')).name;
}
if (JSON.parse(localStorage.getItem('InstockProducts')) === null) {
    localStorage.setItem('InstockProducts', JSON.stringify(instockProducts));
}

const initialState = {
    instockProducts: JSON.parse(localStorage.getItem('InstockProducts')),
    cartProducts: JSON.parse(localStorage.getItem(`CartOf${signInUserName}`)) === null ? [] : JSON.parse(localStorage.getItem(`CartOf${signInUserName}`)),
    boughtHistoryProducts: boughtHistoryProducts,
    qty: 0,
    total: 0,
    selectedCategory: "all",
}

const shopAndCartSlice = createSlice({
    name: "shopAndCart",
    initialState,
    reducers: {
        selectCategory: (state, { payload }) => {
            state.selectedCategory = payload.category
        },
        addToCart: (state, { payload }) => {
            const addItem = state.instockProducts.find(item => item.name === payload.name);
            const foundItem = state.cartProducts.find(item => item.name === addItem.name);
            if (foundItem) {
                if (foundItem.quantity < addItem.instockQuantity) {
                    foundItem.quantity++
                } else {
                    Swal.fire({
                        title: "Sorry",
                        text: "There is not enough stock for this watch!",
                        icon: "warning"
                    });
                }
            } else {
                state.cartProducts.push(addItem)
            }
        },
        increaseQty: (state, { payload }) => {
            const item = state.cartProducts.find(item => item.name === payload.name);
            const originalItem = state.instockProducts.find(item => item.name === payload.name);
            if (item.quantity < originalItem.instockQuantity) {
                item.quantity++
            } else {
                Swal.fire({
                    title: "Sorry",
                    text: "there is not enough stock for this watch!",
                    icon: "warning"
                });
            }
        },
        decreaseQty: (state, { payload }) => {
            const item = state.cartProducts.find(item => item.name === payload.name);
            if (item.quantity > 1) {
                item.quantity--
            }
        },
        removeItem: (state, { payload }) => {
            state.cartProducts = state.cartProducts.filter(item => item.name !== payload.name);
        },
        updateTotal: (state) => {
            let qty = 0;
            let total = 0;
            if (state.cartProducts !== null) {
                state.cartProducts.forEach(item => {
                    qty += item.quantity;
                    total += item.quantity * item.price;
                });
            }
            state.qty = qty;
            state.total = total;
        },
        saveCart: (state) => {
            let signInUserName = JSON.parse(localStorage.getItem('SignInUser')).name;
            localStorage.setItem(`CartOf${signInUserName}`, JSON.stringify(state.cartProducts));
        },
        clearCart: (state) => {
            localStorage.setItem(`CartOf${signInUserName}`, JSON.stringify([]));
            state.cartProducts = [];
        },
        checkOut: (state) => {
            let signInUser = JSON.parse(localStorage.getItem('SignInUser'));
            if (state.total === 0) {
                Swal.fire({
                    title: "Your cart is empty.",
                    text: "Please go to shop and add any items!",
                    icon: "warning"
                });
            } else {
                if (signInUser.walletAmount < state.total) {
                    Swal.fire({
                        title: "Sorry",
                        text: "There is no sufficient amount in your wallet!",
                        icon: "warning"
                    });
                } else {
                    const SignInUserName = signInUser.name
                    let userList = JSON.parse(localStorage.getItem('UserList'))
                    let index = userList.findIndex(user => user.name === signInUser.name)
                    state.boughtHistoryProducts = state.cartProducts
                    if (localStorage.getItem(`HistoryOf${SignInUserName}`) !== null) {
                        let oldBoughtHistory = JSON.parse(localStorage.getItem(`HistoryOf${SignInUserName}`))
                        let updateBoughtHistory = [...state.boughtHistoryProducts, ...oldBoughtHistory]
                        localStorage.setItem(`HistoryOf${SignInUserName}`, JSON.stringify(updateBoughtHistory))
                    } else {
                        localStorage.setItem(`HistoryOf${SignInUserName}`, JSON.stringify(state.boughtHistoryProducts))
                    }
                    for (let i = 0; i < state.cartProducts.length; i++) {
                        let instockIndex = state.instockProducts.findIndex(product => product.name === state.cartProducts[i].name)
                        let oldInstockQuantity = state.instockProducts[instockIndex].instockQuantity
                        state.instockProducts[instockIndex] = { ...state.instockProducts[instockIndex], instockQuantity: oldInstockQuantity - state.cartProducts[i].quantity }
                    }
                    localStorage.setItem('InstockProducts', JSON.stringify(state.instockProducts));
                    userList[index] = { ...userList[index], walletAmount: signInUser.walletAmount - state.total }
                    localStorage.setItem('UserList', JSON.stringify(userList));
                    localStorage.setItem('SignInUser', JSON.stringify({ ...signInUser, walletAmount: signInUser.walletAmount - state.total }))
                    localStorage.setItem(`CartOf${SignInUserName}`, JSON.stringify([]));
                    state.cartProducts = [];
                    state.qty = 0
                    state.total = 0
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your payment was successed.",
                        showConfirmButton: false,
                        timer: 1200
                    });
                }
            }
        }
    }
})

export const { addToCart, increaseQty, decreaseQty, removeItem, updateTotal, checkOut, saveCart, clearCart, selectCategory } = shopAndCartSlice.actions;
export default shopAndCartSlice.reducer;