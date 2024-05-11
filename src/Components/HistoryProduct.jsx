import React from 'react'

const HistoryProduct = ({ item }) => {
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
      </div>
      <div className='flex flex-col items-center'>
        <p className='text-lg font-medium'>Quantity</p>
        <div className='flex flex-row items-center gap-4 text-gray-600 font-medium'>
          <p>{item.quantity}</p>
        </div>
      </div>
    </div>
  )
}

export default HistoryProduct