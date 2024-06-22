import React from 'react'
import { useNavigate } from 'react-router-dom'

const Summary = () => {
    const totalAmount = JSON.parse(localStorage.getItem('amt'))
    const navigate = useNavigate


    return (
        <div className='mx-auto md:max-w-[550px] items-center rounded-xl h-full w-full justify-center p-'>
            <div className='p-5  h-fit border-[1px] shadow-lg rounded-lg w-full flex gap-5 flex-col'>
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
                        <p className="text-md font-medium">Vat/Tax (Tax Included)(0%)</p>
                        <p className="text-md font-medium">(-)$0</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-md font-medium">Add-ons</p>
                        <p className="text-md font-medium">(+)$0</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-md font-medium">Delivery Charge</p>
                        <p className="text-md font-medium">(+$1)</p>
                    </div>
                    <hr className='w-full border-[1px] text-gray-300 mt-4' />
                    <div>
                        <p className='font-medium text-lg flex flex-wrap'>
                            I have read and agreed with
                            <span className='text-red-500 font-semibold mx-1'>Privacy Policy, Terms & Conditions</span>
                            and
                            <span className='text-red-500 font-semibold mx-1'>Refund Policy</span>.
                        </p>
                    </div>

                    <div className='flex justify-between mt-2'>
                        <p className='text-lg font-[600] text-red-500'>Total Amount</p>
                        <p className='text-lg font-semibold text-red-500'>${totalAmount + 1} / Rs.{totalAmount * 133 + 133}</p>
                    </div>
                </div>
                {/* <AddCuttlery /> */}
                <div className='w-full flex items-start h-full'>
                    <button className='w-full hover:bg-[#D2122E] bg-[#EF0107] h-11 rounded-lg text-white '>
                        <p className='text-xl font-[600]'>Confirm Order</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Summary
