import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import Aos from 'aos'
import { StoreContext } from '../Context/ContextApi'

const FoodItems = ({ id, price, setIsOpen,name, description, image ,setStoreData}) => {
    const { url } = useContext(StoreContext);
    
    useEffect(() => {
        Aos.init({ duration: 200 });
    }, []);


    return (
        <div key={id} className='cursor-pointer rounded-lg flex shadow-md flex-col gap-3 w-full sm:max-w-[300px] h-full sm:h-full'>
            <div>
                <img onClick={() => {setStoreData(id); setIsOpen(true)}} src={url + "/images/" + image} className='rounded-lg sm:h-full h-[180px] object-cover w-full' alt="" />
            </div>
            <div className='flex flex-col gap-1 p-2'>
                <div className='flex justify-between'>
                    <p className='sm:text-xl text-lg text-black font-Ubuntu'>{name}</p>
                    <p className='sm:pt-[6px] pt-1'>
                        <img className='rating w-[70px]' src={assets.rating_starts} alt="" />
                    </p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-sm font-Ubuntu font-normal text-gray-700'>{description}</p>
                    <p className='sm:text-2xl text-lg text-gray-500 text-start'>${price}</p>
                </div>
            </div>
        </div>
    );
};

export default FoodItems;

