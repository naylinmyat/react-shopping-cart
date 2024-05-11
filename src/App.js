import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./Screens/Cart";
import { saveCart, updateTotal } from "./Features/ShopAndCartSlice";
import Home from "./Screens/Home";
import SignInAndSignUp from "./Screens/SignInAndSignUp";
import PrivateRoutes from "./utils/PrivateRoutes";
import History from "./Screens/History";

function App() {
  const { cartProducts } = useSelector((store) => store.shopAndCart);
  const { usersList } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTotal())
    if(localStorage.getItem('UserList') === null){
      localStorage.setItem('UserList', JSON.stringify(usersList));
    }
    if(localStorage.getItem('Token') === null){
      localStorage.setItem('Token', JSON.stringify(false));
    }
    if(localStorage.getItem('SignInUser') !== "null" && localStorage.getItem('SignInUser') !== null){
      dispatch(saveCart());
      const SignInUserName = JSON.parse(localStorage.getItem('SignInUser')).name
      console.log(`HistoryOf${SignInUserName}`)
      console.log(localStorage.getItem(`HistoryOf${SignInUserName}`))
      console.log(`CartOf${SignInUserName}`)
      console.log(localStorage.getItem(`CartOf${SignInUserName}`))
    }
    console.log(localStorage.getItem('UserList'))
    console.log(localStorage.getItem('Token'))
    console.log(localStorage.getItem('SignInUser'))
  },[cartProducts,dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={ <Home /> } exact/>
          <Route path="/cart" element={ <Cart /> } />
          <Route path="/boughtHistory" element={ <History /> } />
        </Route>
        <Route path="/signUpAndSignIn" element={ <SignInAndSignUp /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
