import React from 'react'
import { FaShop } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HistoryProduct from '../Components/HistoryProduct';
import Navbar from '../Components/Navbar';

const History = () => {
    const SignInUserName = JSON.parse(localStorage.getItem('SignInUser')).name;
    const boughtHistoryProducts = JSON.parse(localStorage.getItem(`HistoryOf${SignInUserName}`));
    const qty = (boughtHistoryProducts === null) ? [] : boughtHistoryProducts.length;
    
    return (
        <>
            <Navbar />
            <div className='w-full max-w-3xl mx-auto'>
                <div className='flex justify-between items-center px-[4%]'>
                    <h2 className='text-3xl tracking-wide py-4'>Your History</h2>
                    <Link to="/">
                        <div className='flex items-center bg-indigo-500 text-white p-2.5 rounded-lg hover:bg-indigo-900 cursor-pointer'>
                            <FaShop />
                            <p className='ml-2'>Back to shop</p>
                        </div>
                    </Link>
                </div>
                {
                    (qty >= 1)
                        ?
                        <>
                            <div>
                                {
                                    boughtHistoryProducts.map((item) =>
                                        <HistoryProduct
                                            key={new Date().getTime + Math.random()}
                                            item={item}
                                        />
                                    )
                                }
                            </div>
                        </>
                        :
                        <>
                            <p className='text-2xl text-gray-300 font-medium shadow-inner py-8 shadow-indigo-300 rounded-lg text-center mb-8 mx-2'>You bought nothing!</p>
                        </>
                }
            </div>
        </>
    )
}

export default History