import React, { useContext, useEffect } from 'react';
import { RxCross1 } from "react-icons/rx";
import { FiAlertTriangle } from "react-icons/fi";
import { StoreContext } from '../Components/Context/ContextApi';

const Logout = ({ setLogout }) => {
const {handleLogOut} = useContext(StoreContext)

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  }, [])

  return (
    <div className='fixed lg:px-0 px-[6%] top-0 left-0 flex items-center z-20 justify-center w-full h-full backdrop-brightness-50 backdrop-blur-[2px] bg-opacity-40'>
      <div className='w-full md:w-fit lg:w-[37vw] flex flex-col justify-between relative rounded-lg border-2 shadow-2xl bg-white'>
        <button onClick={() => setLogout(false)} className='p-3 justify-end items-end flex text-2xl text-gray-500 hover:text-gray-700'>
          <RxCross1 />
        </button>
        <div className='flex flex-col mt-3 gap-1 w-full'>
          <hr className='border-gray-300 w-full' />
          <div className='flex gap-2 md:gap-1 p-5 text-gray-600'>
            <FiAlertTriangle className='mr-2 text-orange-500 text-2xl' />
            <p className='text-sm md:text-lg'>Do you really wish to leave and logout?</p>
          </div>
          <hr className='border-gray-300 w-full' />
        </div>
        <div className='flex mt-2 p-3 w-full items-center justify-center md:justify-end gap-4'>
          <button onClick={handleLogOut} className='bg-green-500 text-white md:w-32 md:h-11 p-2 md:p-0 h-fit w-fit rounded-md shadow-md hover:bg-green-600'>
            Yes, log out
          </button>
          <button onClick={() => setLogout(false)} className='bg-red-500 text-white md:w-32 md:h-11 p-2 md:p-0 h-fit w-fit  rounded-md shadow-md hover:bg-red-600'>
            No, cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Logout;
