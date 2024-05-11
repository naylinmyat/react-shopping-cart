import React from 'react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../Components/CartProduct';
import Navbar from '../Components/Navbar';
import { FaShop } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { IoBagCheckOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { checkOut, clearCart } from '../Features/ShopAndCartSlice';

const Cart = () => {
    const SignInUserName = JSON.parse(localStorage.getItem('SignInUser')).name;
    const { total } = useSelector((store) => store.shopAndCart);
    const cartProducts = JSON.parse(localStorage.getItem(`CartOf${SignInUserName}`));
    const dispatch = useDispatch();

    const handleCheckOut = async () => {
        const { value: password } = await Swal.fire({
            title: "Enter your password",
            input: "password",
            inputLabel: "Password",
            inputPlaceholder: "Enter your password",
            inputAttributes: {
                maxlength: "50",
                autocapitalize: "off",
                autocorrect: "off"
            }
        });
        if (password === JSON.parse(localStorage.getItem('SignInUser')).password) {
            dispatch(checkOut());
        } else {
            Swal.fire({
                title: "Try Again",
                text: "Incorrect Password!",
                icon: "error"
            });
        }
    }
    const handleClearCart = () => {
        dispatch(clearCart());
    }
    return (
        <>
            <Navbar />
            <div className='w-full max-w-3xl mx-auto'>
                <div className='flex justify-between items-center px-[4%]'>
                    <h2 className='text-3xl tracking-wide py-4'>Your Cart</h2>
                    <Link to="/">
                        <div className='flex items-center bg-indigo-500 text-white p-2.5 rounded-lg hover:bg-indigo-900 cursor-pointer'>
                            <FaShop />
                            <p className='ml-2'>Back to shop</p>
                        </div>
                    </Link>
                </div>
                {
                    (cartProducts.length >= 1)
                        ?
                        <>
                            <div>
                                {
                                    cartProducts.map((item) =>
                                        <CartProduct
                                            key={new Date().getTime + Math.random()}
                                            item={item}
                                        />
                                    )
                                }
                            </div>
                        </>
                        :
                        <>
                            <p className='text-2xl text-gray-300 font-medium shadow-inner py-8 shadow-indigo-300 rounded-lg text-center mb-8 mx-2'>Your Cart Is Empty!</p>
                        </>
                }
            </div>
            <div className='w-full pb-8 mt-4 max-w-3xl mx-auto flex justify-end flex-wrap gap-2 items-center'>
                <p className='text-2xl font-medium mr-2'>Total : ${total}</p>
                <div onClick={() => handleCheckOut()} className='flex mr-2 items-center bg-indigo-500 text-white p-2.5 rounded-lg hover:bg-indigo-900 cursor-pointer'>
                    <IoBagCheckOutline />
                    <p className='ml-2'>Checkout</p>
                </div>
                <div onClick={() => handleClearCart()} className='flex mr-2 w-[113.4px] items-center bg-indigo-500 text-white p-2.5 rounded-lg hover:bg-indigo-900 cursor-pointer'>
                    <AiFillDelete />
                    <p className='ml-2'>Clear All</p>
                </div>
            </div>

        </>
    )
}

export default Cart