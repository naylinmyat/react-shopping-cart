import { createSlice } from "@reduxjs/toolkit";
import { usersList } from "../Data";

const initialState = {
    usersList: usersList,
    isSignIn: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signIn: (state, { payload }) => {
            if (payload.name === "" && payload.password === "") {
                alert("Please fill Name and Password!")
            }else if(payload.name === ""){
                alert("Please fill Name!")
            }else if(payload.password === ""){
                alert("Please fill Password!")
            } else {
                const signInUser = JSON.parse(localStorage.getItem('UserList')).find(user => user.name === payload.name && user.password === payload.password);
                if (signInUser) {
                    state.isSignIn = true;
                    localStorage.setItem('Token', JSON.stringify(true));
                    localStorage.setItem('SignInUser', JSON.stringify(signInUser));
                } else {
                    alert("Incorrect name and password!")
                }
            }
        },
        signUp: (state, { payload }) => {
            if (payload.name === "" && payload.password === "") {
                alert("Please fill Name and Password!")
            }else if(payload.name === ""){
                alert("Please fill Name!")
            }else if(payload.password === ""){
                alert("Please fill Password!")
            } else {
                const foundUser = JSON.parse(localStorage.getItem('UserList')).find(user => user.name === payload.name);
                if(foundUser){
                    alert("Sorry,this name is already exist!")
                }else if(payload.password.length < 6){
                    alert("Your password has at least 6 characters!")
                }else if(!(/[a-zA-Z]/.test(payload.password))){
                    alert("Your password has at least one alphabet character!")
                }else if(!(/[0-9]/.test(payload.password))){
                    alert("Your password has at least one numeric character!")
                }else{
                    const addUser = {name: payload.name, password: payload.password, walletAmount: 1000};
                    state.usersList = JSON.parse(localStorage.getItem('UserList'));
                    state.usersList.push(addUser);
                    localStorage.setItem('UserList', JSON.stringify(state.usersList));
                    state.isSignIn = true;
                    localStorage.setItem('Token', JSON.stringify(true));
                    localStorage.setItem('SignInUser', JSON.stringify(addUser));
                }
            }
        },
        signOut: () => {
            localStorage.setItem('Token', JSON.stringify(false));
            localStorage.setItem('SignInUser', JSON.stringify(null));
        },
    }
})

export const { signIn, signUp, signOut } = userSlice.actions;
export default userSlice.reducer;