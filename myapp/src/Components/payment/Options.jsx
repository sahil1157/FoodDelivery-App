import React from 'react'

const Options = () => {
    return (
        <div className='w-full md:max-w-[700px] overflow-scroll border-[1px] shadow-lg h-fit rounded-lg'>
            <div className='flex flex-col gap-3 p-6'>
                <p className='text-xl font-Ubuntu'>Delivery Option</p>
                <form className='flex gap-12 flex-row'>
                    <label className='flex items-center w-full gap-4 cursor-pointer'>
                        <input name='delivery' type="radio" className='w-[18px] h-[18px]' />
                        <p className='text-md font-semibold'>Home Delivery</p>
                    </label>
                    <label className='flex items-center w-full gap-4 cursor-pointer'>
                        <input name='delivery' type="radio" className='w-[18px] h-[18px]' />
                        <p className='text-md font-semibold'>Take Away</p>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Options
