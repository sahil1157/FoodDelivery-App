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
            <div data-aos='fade-up' key={id} className='cursor-pointer rounded-lg flex shadow-md flex-col gap-3 max-w-[280px] h-fit'>
                <div>
                    <img onClick={() => { setIsOpen(true); setStoreData(id) }} src={url + "/images/" + image} className='rounded-lg w-fit' alt="" />
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
        </>
    )
}

export default MappedExploredMenus
