
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";

const Navbar = ({ setShowModal,onClick,onclick, setShowSignup }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const Navigate = useNavigate()


  return (
    <div className="bg-green-500 text-white">
      {/* Sidebar for smaller screens */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:hidden backdrop-blur-sm fixed inset-0 z-50 bg-black bg-opacity-50`} onClick={() => setIsSidebarOpen(false)}></div>
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-green-500 transform transition duration-300 ease-in-out`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsSidebarOpen(false)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center gap-10 mt-6">
          <Link to="/menu" className="text-xl font-Ubuntu">menu</Link>
          <Link to="/contact" className="text-xl font-Ubuntu">contact us</Link>
          <button onClick={() => setShowSignup(true)} className="text-xl font-Ubuntu">signup</button>
          <button onClick={() => setShowModal(true)} className="text-xl font-Ubuntu">login Us</button>
          <Link to="/cart" className="text-xl font-Ubuntu mb-4">cart</Link>
        </div>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center h-16 px-4 md:px-8 lg:px-16">
        <div className="flex w-full justify-between items-center">
          <div className='flex flex-row gap-4'>
            <button onClick={() => Navigate('/')} className="text-3xl md:text-3xl font-bold">GoFood</button>
            <div className='hidden lg:flex lg:flex-row ml-16 flex-row  items-center gap-7'>
              <Link to="/menu" className="text-xl font-Ubuntu">menu</Link>
              <Link to="/contact" className="text-xl font-Ubuntu">contact us</Link>
            </div>
          </div>
          <div className="md:hidden ml-4">
            <button onClick={() => setIsSidebarOpen(true)}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <button className='mr-7 md:block hidden'>
            <FaCartShopping size={30} />
          </button>
          <button onClick={() => setShowSignup(true)} className="hidden md:inline-block font-Ubuntu bg-white border-[1px] hover:border-slate-600 hover:text-black hover:bg-gray-200 duration-300 text-green-500 px- text-lg h-10 w-24  rounded-full">
            Signup
          </button>
          <button onClick={() => setShowModal(true)} className="hidden md:inline-block font-Ubuntu bg-white border-[1px] hover:border-slate-600 hover:text-black duration-300 text-green-500 px-4 text-lg h-10 w-24 rounded-full mr-2">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
