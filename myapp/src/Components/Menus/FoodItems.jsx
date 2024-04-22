import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import Aos from 'aos'
import { StoreContext } from '../Context/ContextApi'

const FoodItems = ({ id, price, name, category, description, image }) => {
    const { url } = useContext(StoreContext);
    
    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);


    return (
        <div data-aos='fade-up' key={id} className='cursor-pointer rounded-lg flex shadow-md flex-col gap-3 max-w-[280px] h-fit'>
            <div>
                <img src={url + "/images/" + image} className='rounded-lg w-fit' alt="" />
            </div>
            <div className='flex flex-col gap-2 p-3'>
                <div className='flex justify-between'>
                    <p className='text-xl text-black font-Ubuntu'>{name}</p>
                    <p className='pt-[6px]'>
                        <img className='rating w-[70px]' src={assets.rating_starts} alt="" />
                    </p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-Ubuntu font-normal text-gray-700'>{description}</p>
                    <p className='text-2xl text-gray-500 text-start'>${price}</p>
                </div>
            </div>
        </div>
    );
};

export default FoodItems;

