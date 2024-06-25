import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../Context/ContextApi';
import { assets } from '../assets/assets';
import Aos from 'aos';

const MappedExploredMenus = ({ id, price, name, setIsOpen, setStoreData, description, image }) => {
    const { url } = useContext(StoreContext);
    useEffect(() => {
        Aos.init({ duration: 200 })
    }, [])
    return (

        <>
            <div data-aos='fade-up' key={id} className='cursor-pointer mt-12 border-[1px] rounded-lg flex shadow-md flex-col gap-3 w-full min-w-[300px] sm:max-w-[300px] h-fit'>
                <div>
                    <img onClick={() => { setIsOpen(true); setStoreData(id) }} src={url + "/images/" + image} className='rounded-t-lg w-full object-cover h-[180px]' alt="" />
                </div>
                <div className='flex flex-col md:gap-3 md:p-2 gap-1 p-2'>
                    <div className='flex justify-between'>
                        <p className='md:text-xl text-lg text-black font-Ubuntu'>{name}</p>
                        <p className='pt-[6px]'>
                            <img className='rating w-[70px]' src={assets.rating_starts} alt="" />
                        </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-Ubuntu font-normal text-gray-700'>{description}</p>
                        <p className='text-lg md:text-2xl text-red-500 text-start'>${price}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MappedExploredMenus
