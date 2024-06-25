import React, { useContext } from 'react'
import AddCuttlery from './AddCuttlery'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../Context/ContextApi'


const CartItems = () => {
  const { check,setShowModal, handleToastify,totalAmount } = useContext(StoreContext)
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (check === true) {
      navigate('/user/payment')
    }
    else {
      navigate('/')
      handleToastify()
      setShowModal(true)
    }
  }

  return (
    <>
      <div className=' h-full w-full flex items-start px-0'>
        <div className='sm:p-5 p-2 h-fit border-[1px] shadow-lg rounded-lg w-full lg:max-w-[550px] flex gap-5 flex-col'>
          <p className='text-lg font-semibold'>Overview Summary</p>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <p className="text-md font-medium">Items price</p>
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
            <button onClick={handleNavigate} className='w-full hover:bg-[#D2122E] bg-[#EF0107] h-12 rounded-lg text-white '>
              <p className='text-md sm:text-xl font-[600]'>Proceed to Checkout</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItems
