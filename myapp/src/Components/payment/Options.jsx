import React, { useState } from 'react';
import Date from './Date';
import Location from './Location';
import PayOption from './PayOption';

const Options = ({ setOpen, getItem }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.id);
    };

    return (
        <>
            <div className='flex w-full flex-col text-slate-500 h-full gap-2 items-center'>
                <div className='md:max-w-[650px] w-full overflow-scroll border-[2px] shadow-lg h-fit rounded-lg'>
                    <div className='flex flex-col gap-3 p-6'>
                        <p className='text-xl text-black font-Ubuntu'>Delivery Option</p>
                        <form className='flex gap-7 sm:gap-12 px-5 pt-1 flex-col sm:flex-row'>
                            <label
                                className={`flex items-center w-full gap-4 cursor-pointer ${selectedOption === 'homeDelivery' ? 'text-red-600' : ''
                                    }`}
                            >
                                <input
                                    name='delivery'
                                    type='radio'
                                    className='radio w-[18px] h-[18px] hidden'
                                    id='homeDelivery'
                                    checked={selectedOption === 'homeDelivery'}
                                    onChange={handleOptionChange}
                                />
                                <span
                                    className={`w-[18px] h-[18px] border-2 rounded-full flex items-center justify-center ${selectedOption === 'homeDelivery' ? 'border-red-600' : 'border-gray-400'
                                        }`}
                                >
                                    {selectedOption === 'homeDelivery' && (
                                        <span className="w-[10px] h-[10px] bg-red-600 rounded-full"></span>
                                    )}
                                </span>
                                <p className='text-md sm:text-lg font-semibold'>Home Delivery</p>
                            </label>
                            <label
                                className={`flex items-center w-full gap-4 cursor-pointer ${selectedOption === 'takeAway' ? 'text-red-600' : ''
                                    }`}
                            >
                                <input
                                    name='delivery'
                                    type='radio'
                                    className='radio w-[18px] h-[18px] hidden'
                                    id='takeAway'
                                    checked={selectedOption === 'takeAway'}
                                    onChange={handleOptionChange}
                                />
                                <span
                                    className={`w-[18px] h-[18px] border-2 rounded-full flex items-center justify-center ${selectedOption === 'takeAway' ? 'border-red-600' : 'border-gray-400'
                                        }`}
                                >
                                    {selectedOption === 'takeAway' && (
                                        <span className="w-[10px] h-[10px] bg-red-600 rounded-full"></span>
                                    )}
                                </span>
                                <p className='text-md sm:text-lg font-semibold'>Take Away</p>
                            </label>
                        </form>
                    </div>
                </div>
                <div className='flex flex-col gap-7 w-full'>
                    <Date />
                    <Location />
                    <PayOption getItem={getItem} setOpen={setOpen} />
                </div>
            </div>
        </>

    );
};

export default Options;
