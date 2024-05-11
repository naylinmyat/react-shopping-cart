import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";
import { signOut } from "../Features/UserSlice";
import { GrHistory } from "react-icons/gr";

const Navbar = () => {
  const qty = useSelector((store) => store.shopAndCart.qty)
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  }
  return (
    <>
      <div className='w-full fixed top-0 flex flex-row justify-between items-center px-[4%] py-3 text-lg font-medium bg-indigo-500'>
        <Link to="/"><p className="text-3xl text-white">Shop</p></Link>
        <div className="flex">
          <Link to="/cart">
            <div className="flex items-center text-white text-xl mr-7">
              <FaShoppingCart className="mr-2" />
              <p>Cart<span className='text-xs align-top bg-red-500 text-white rounded-full px-2 py-1 mx-1'>{qty}</span></p>
            </div>
          </Link>
          <Link to="/signUpAndSignIn">
            <p onClick={() => handleSignOut()} className="text-white text-xl">SignOut</p>
          </Link>
        </div>
      </div>
      <p className="text-indigo-900 mt-20 text-lg font-medium tracking-widest pl-[4%]">Name &nbsp;&nbsp;:&nbsp; {JSON.parse(localStorage.getItem('SignInUser')).name}</p>
      <p className="text-indigo-900 text-lg font-medium tracking-widest pl-[4%]">Wallet &nbsp;:&nbsp; ${JSON.parse(localStorage.getItem('SignInUser')).walletAmount}</p>
      <Link to="/boughtHistory">
        <div className='w-fit flex ml-[4%] mt-2 items-center bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-900 cursor-pointer'>
          <GrHistory />
          <p className='ml-2'>Your bought history</p>
        </div>
      </Link>
    </>
  )
}

export default Navbar