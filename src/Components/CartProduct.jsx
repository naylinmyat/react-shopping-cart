import React from 'react'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { decreaseQty, increaseQty, removeItem } from '../Features/ShopAndCartSlice';

const CartProduct = ({ item }) => {
    const dispatch = useDispatch();

    const handleIncreaseQty = (name) => {
        dispatch(increaseQty({ name }));
    }

    const handleDecreaseQty = (name) => {
        dispatch(decreaseQty({ name }));
    }

    const handleRemoveItem = (name) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to remove this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3949AB",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeItem({ name }));
            }
        });
    }

    return (
        <div className='flex flex-row items-center justify-between px-[6%] mx-2 py-2 mb-2 shadow-inner shadow-indigo-300 rounded-lg'>
            {
                item.category === "watch" ?
                    <img className='h-20 w-16 mr-10 ml-4' src={item.img} alt={item.name + "watches"} /> :
                    <img className='h-20 w-24 mr-4' src={item.img} alt={item.name + "sneakers"} />
            }
            <div className='w-1/2'>
                <p className='text-xl font-medium'>{item.name}</p>
                <p className='text-lg tracking-wide'>${item.price}</p>
                <button onClick={() => handleRemoveItem(item.name)} className='text-red-500 tracking-wide pt-1 pb-3 hover:text-red-900'>Remove</button>
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-lg font-medium'>Quantity</p>
                <div className='flex flex-row items-center gap-4 text-gray-600 font-medium'>
                    <button onClick={() => {
                        if (item.quantity === 1) {
                            handleRemoveItem(item.name);
                            return;
                        }
                        handleDecreaseQty(item.name)
                    }} className='text-xl'>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleIncreaseQty(item.name)} className='text-xl'>+</button>
                </div>
            </div>
        </div>
    )
}

export default CartProduct