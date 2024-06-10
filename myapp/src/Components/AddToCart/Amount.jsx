import React, { useContext } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { StoreContext } from '../Context/ContextApi';

const Amount = ({ handleCardItems, storeItem }) => {
    const { quantity, decrementQuantity, incrementQuantity } = useContext(StoreContext);

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex text-red-500 font-semibold flex-row justify-between'>
                <p>Total Amount</p>
                <p>${storeItem && storeItem.price * quantity}</p>
            </div>
            <div className='flex flex-row gap-3'>
                <div className='flex items-center w-32 flex-row gap-2'>
                    <FaMinus
                        size={25}
                        className='cursor-pointer rounded-full text-white p-1 bg-gray-300'
                        onClick={decrementQuantity}
                    />
                    <p className='text-lg'>{quantity}</p>
                    <FaPlus
                        size={25}
                        className='cursor-pointer rounded-full text-white p-1 bg-red-500'
                        onClick={incrementQuantity}
                    />
                </div>
                <button
                    onClick={() => handleCardItems({ ...storeItem, quantity })}
                    className='w-full hover:bg-red-600 h-12 rounded-xl bg-red-500 text-white'
                >
                    Add To Cart
                </button>
            </div>
            
        </div>
    );
};

export default Amount;
