import React from 'react'
import AddCuttlery from './AddCuttlery'
import { useNavigate } from 'react-router-dom'

const CartItems = ({ totalAmount, quantity }) => {
  const navigate = useNavigate()
  return (
    <>
      <div style={{ paddingInline: '2%' }} className=' h-full flex items-start '>
        <div className='p-5  h-fit border-[1px] shadow-lg rounded-lg w-full md:max-w-[550px] flex gap-5 flex-col'>
          <p className='text-lg font-semibold'>Overview Summary</p>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <p className="text-md font-medium">Items</p>
              <p className="text-md font-medium">${totalAmount}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md font-medium">In NPR</p>
              <p className="text-md font-medium">Rs.{totalAmount * 133}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md font-medium">Discount</p>
              <p className="text-md font-medium">(-)$0</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md font-medium">Add-ons</p>
              <p className="text-md font-medium">(+)$0</p>
            </div>
            <hr className='w-full border-[1px] text-gray-300 mt-4' />
            <div className='flex justify-between'>
              <p className='text-lg font-[600] text-red-500'>Subtotal</p>
              <p className='text-lg font-semibold text-red-500'>${totalAmount} / Rs.{totalAmount * 133}</p>
            </div>
          </div>
          <AddCuttlery />
          <div className='w-full flex items-start h-full'>
            <button onClick={() => navigate('/user/payment')} className='w-full hover:bg-red-700 h-12 rounded-lg bg-red-600 text-white '>
              <p className='text-xl font-[600]'>Proceed to Checkout</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItems
