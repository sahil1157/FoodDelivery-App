import React from 'react'

const CartHeader = ({header}) => {
    return (
        <div className='w-full'>
            <div className='w-full flex justify-center items-center h-16 bg-red-100'>
                <p className='font-semibold text-xl'>{header}</p>
            </div>
        </div>
    )
}

export default CartHeader
