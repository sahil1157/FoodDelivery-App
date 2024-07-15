import React from 'react'
import { LuFileEdit } from "react-icons/lu";
import digitalp from '../../images/digitalpayment.png'
import { PiWarningOctagonFill } from "react-icons/pi";

const PayOption = ({ setOpen, getItem }) => {
    return (
        <div className='flex w-full items-center justify-center '>
            <div className='md:max-w-[650px] p-6 w-full overflow-scroll border-[1px] shadow-lg h-fit rounded-lg'>
                <div className='w-full h-fit flex flex-col gap-3'>
                    <div className='w-full justify-between flex items-center'>
                        <p className='text-lg text-black font-Ubuntu'> Payment Method</p>
                        <button onClick={() => setOpen(true)}>
                            <LuFileEdit size={25} className='text-orange-500' />
                        </button>
                    </div>
                    <div className='w-full relative items-center flex'>
                        {
                            getItem && getItem ? (
                                <>
                                    <input
                                        type="text"
                                        className='relative md:text-md font-semibold text-sm text-neutral-400 text-sla w-full h-11 rounded-xl p-2 pl-14 justify-center px-5 items-center flex border-[1px] border-gray-400'
                                        disabled
                                        value={`payment via (${getItem})`}
                                    />
                                    <img
                                        src={digitalp}
                                        className='w-8 h-6 absolute left-4'
                                        alt=""
                                    />
                                </>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        className='relative md:text-md flex-wrap font-semibold text-sm text-neutral-400 text-sla w-full h-11 rounded-xl p-2 pl-7 justify-center px-5 items-center flex border-[1px] border-gray-400'
                                        disabled
                                        value={`Select Payment Method`}
                                    />
                                    <div className='absolute flex left-0 pl-[185px]'>
                                        <PiWarningOctagonFill className='text-red-500 sm:flex hidden'/>
                                    </div>
                                </>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PayOption
