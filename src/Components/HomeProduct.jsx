import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../Features/ShopAndCartSlice';

const HomeProduct = ({ item, selectedCategory }) => {

  const dispatch = useDispatch();

  const handleAddToCart = (name) => {
    dispatch(addToCart({ name }))
  }

  return (
    <>
      {
        selectedCategory === "all" ?
          <div className='w-80 px-8 py-2 border border-gray-200 rounded-lg'>
            {
              item.category === "watch" ?
                <img className='h-52 w-36 mx-auto' src={item.img} alt={item.name + "watches"} /> :
                <img className='h-52 w-full' src={item.img} alt={item.name + "sneakers"} />
            }

            <div className='flex flex-row items-center justify-between py-4'>
              <div>
                <p className='text-xl'>{item.name}</p>
                <p className='text-lg'>${item.price}</p>
                <p className='text-lg'>Instock : {item.instockQuantity}</p>
              </div>
              <button onClick={() => handleAddToCart(item.name)} className='bg-indigo-500 text-white text-medium font-medium rounded-xl p-2.5 hover:bg-indigo-900'>Add To Cart</button>
            </div>
          </div> :
          selectedCategory === item.category ?
            <div className='w-80 px-8 py-2 border border-gray-200 rounded-lg'>
              {
                item.category === "watch" ?
                  <img className='h-52 w-36 mx-auto' src={item.img} alt={item.name + "watches"} /> :
                  <img className='h-52 w-full' src={item.img} alt={item.name + "watches"} />
              }

              <div className='flex flex-row items-center justify-between py-4'>
                <div>
                  <p className='text-xl'>{item.name}</p>
                  <p className='text-lg'>${item.price}</p>
                  <p className='text-lg'>Instock : {item.instockQuantity}</p>
                </div>
                <button onClick={() => handleAddToCart(item.name)} className='bg-indigo-500 text-white text-medium font-medium rounded-xl p-2.5 hover:bg-indigo-900'>Add To Cart</button>
              </div>
            </div> :
            null
      }
      </>
  )
}

export default HomeProduct