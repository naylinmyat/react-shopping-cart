import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeProduct from '../Components/HomeProduct'
import Navbar from '../Components/Navbar'
import { selectCategory } from '../Features/ShopAndCartSlice'

const Home = () => {
  const { instockProducts, selectedCategory } = useSelector((store) => store.shopAndCart)
  const dispatch = useDispatch();

  const handleSelectCategory = (category) => {
    dispatch(selectCategory({category}))
  }

  return (
    <>
    <Navbar />
    <div className='pb-8'>
        <h2 className='text-3xl tracking-wide py-4 pl-[4%]'>Shop</h2>
        <div className='flex justify-center items-center gap-2 text-xl mb-4'>
          {
            selectedCategory === "all" ?
              <div className='text-center text-white bg-indigo-500 p-1 w-24 border-[1px] border-indigo-500 rounded-lg cursor-pointer'>
                <p>All</p>
              </div> :
              <div onClick={() => handleSelectCategory("all")} className='text-center text-indigo-500 p-1 w-24 border-[1px] border-indigo-500 rounded-lg cursor-pointer hover:bg-indigo-500 hover:text-white'>
                <p>All</p>
              </div>   
          }
          {
            selectedCategory === "watch" ?
              <div className='text-center text-white bg-indigo-500 p-1 w-24 border-[1px] border-indigo-500 rounded-lg cursor-pointer'>
                <p>Watch</p>
              </div> :
              <div onClick={() => handleSelectCategory("watch")} className='text-center text-indigo-500 p-1 w-24 border-[1px] border-indigo-500 rounded-lg cursor-pointer hover:bg-indigo-500 hover:text-white'>
                <p>Watch</p>
              </div>
          }
          {
            selectedCategory === "sneaker" ?
              <div className='text-center text-white bg-indigo-500 p-1 w-24 border-[1px] border-indigo-500 rounded-lg cursor-pointer'>
                <p>Sneaker</p>
              </div> :
              <div onClick={() => handleSelectCategory("sneaker")} className='text-center text-indigo-500 p-1 w-24 border-[1px] border-indigo-500 rounded-lg cursor-pointer hover:bg-indigo-500 hover:text-white'>
                <p>Sneaker</p>
              </div>
          }
        </div>
        <div className='flex flex-row flex-wrap justify-center gap-4'>
        {
            instockProducts.map((item,i) =>
                <HomeProduct
                    key={i}
                    item={item}
                    selectedCategory={selectedCategory}
                />
            )
        }
        </div>
    </div>
    </>
  )
}

export default Home