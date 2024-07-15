
import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import MenuItems from './MenuItems';
import AOS from 'aos';
import { StoreContext } from '../Context/ContextApi';
import MainCart from '../AddToCart/MainCart';
const AllMenus = ({ setShowFilter, handleCardItems }) => {

    const { Default, sortByVeg, storeData, setStoreData, handleSorting, sortByDeserts, sortByPrice, setInputVal } = useContext(StoreContext)
    const [current, setCurrent] = useState();
    const [isOpen, setIsOpen] = useState(false)

    const menu = [
        {
            name: "Cake",
            onClick: handleSorting
        },
        {
            name: "pure veg",
            onClick: sortByVeg
        },
        {
            name: "deserts",
            onClick: sortByDeserts
        },
        {
            name: "default",
            onClick: Default
        }
    ];


    return (
        <>
            <div data-aos='fade-up' className='relatve flex h-full relative w-full pt-8 flex-col gap-6 '>
                <p className='text-3xl text-red-500 mx-auto font-Ubuntu font-light'>Order Now</p>
                <div className=' justify-center flex'>
                    <div className='relative flex justify-center items-center' action="">
                        <input onChange={(e) => setInputVal(e.target.value)} type="text" placeholder='Search Items' className='w-full md:w-[40vw] outline-none text-xl text-gray-700 p-4 placeholder:text-xl font-light placeholder:font-Ubuntu rounded-md border-[1px] border-gray-400 h-12' />
                        <button className='absolute text-gray-400 right-4 items-center justify-center'>
                            <CiSearch size={30} />
                        </button>
                    </div>
                </div>
                <div>
                    <p className='text-2xl lg:text-start text-center font-light text-gray-500 font-Ubuntu'>Filters:</p>
                </div>
                <div className='flex -mt-2 relative flex-wrap lg:flex-row gap-4 justify-center md:justify-start'>
                    <button onClick={() => setShowFilter(true)} className='w-32 border-[1px] hover:-translate-y-1 duration-300 h-12 text-gray-500 border-gray-400 rounded-md text-xl font-Ubuntu font-light'>
                        filter
                    </button>
                    {menu.map((menuItem, index) => (
                        <button
                            key={index}
                            onClick={() => { setCurrent(index); menuItem.onClick(); }}
                            className={`w-32 border-[1px] hover:-translate-y-1 duration-300 h-12 text-gray-500 border-gray-400 rounded-md ${current === index && 'bg-red-500 text-white'} text-xl font-Ubuntu font-light`}
                        >
                            {menuItem.name}
                        </button>
                    ))}
                </div>
                <p className='text-2xl lg:text-start lg:pt-2 pt-4 text-center font-Ubuntu text-black'>Top dishes near you</p>
                <MenuItems setIsOpen={setIsOpen} setStoreData={setStoreData} sortByPrice={sortByPrice} />
            </div>
            {
                isOpen && storeData && <MainCart handleCardItems={handleCardItems} setIsOpen={setIsOpen} storeData={storeData} />
            }
        </>
    );
};

export default AllMenus;
