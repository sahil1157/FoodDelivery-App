import React, { useContext } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { ImBin2 } from "react-icons/im";
import { StoreContext } from '../Context/ContextApi';
import { RiDeleteBin6Line } from "react-icons/ri";
import Payment from '../../Screens/Payment';

const AddDelete = ({ item }) => {
    const { incrementQuantity, handleCardItems, setSelectItems } = useContext(StoreContext);

    const handleIncrement = () => {
        incrementQuantity();
        handleCardItems({ ...item, quantity: item.quantity + 1 });
    };

    const handleDecrement = () => {
        if (item.quantity > 0) {
            const newItem = item.quantity - 1
            if (newItem === 0) {
                setSelectItems(prev => prev.filter(x => x._id !== item._id))
            }
            else {
                handleCardItems({ ...item, quantity: newItem })
            }
        }
    }

    return (
        <>
            <div className='flex flex-row gap-3'>
                <button
                    className='w-6 text-white justify-center h-6 items-center flex rounded-full hover:bg-gray-600 bg-gray-500'
                    onClick={handleDecrement}
                >
                    {
                        item && item.quantity === 1 ?
                            <RiDeleteBin6Line size={13} /> : <FaMinus size={10} />

                    }
                </button>
                <p className='text-xl -mt-1'>{item.quantity}</p>
                <button
                    onClick={handleIncrement}
                    className='w-6 text-white hover:bg-red-700 justify-center h-6 items-center flex rounded-full bg-red-600'
                >
                    <FaPlus size={13} />
                </button>
                
            </div>
        </>
    );
}

export default AddDelete;
