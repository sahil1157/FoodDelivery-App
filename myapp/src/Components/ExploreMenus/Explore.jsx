import React, { useContext, useEffect } from 'react'
import { menu_list } from '../assets/assets'
import AOS from 'aos'
import "aos/dist/aos.css"
import { LuMoveRight } from "react-icons/lu";
import RouteMenus from './RouteMenus';
import { StoreContext } from '../Context/ContextApi';

const Explore = ({ activeLink, setActiveLink }) => {

    const { sortByMenu } = useContext(StoreContext)
  

    useEffect(() => {
        AOS.init({ duration: 200 })
    }, [])


    return (
        <div className='flex justify-center w-full flex-col gap-4 pt-10 '>
            <div className='text-red-500 flex justify-between' >
                <p data-aos="fade-right" className='flex text-2xl md:text-4xl font-medium'>What's on your mind?</p>
                <button data-aos='fade-left'>
                    <LuMoveRight size={30} />
                </button>
            </div>
            <div data-aos="fade-up" className=' flex pt-5 overflow-x-scroll flex-row justify-between gap-6'>
                {
                    menu_list && menu_list.map((x, ind) => {

                        return (
                                <div onClick={() => sortByMenu(x.name)} key={x.id || ind} onMouseLeave={() => setActiveLink('')} onMouseOver={() => setActiveLink(ind)} className='flex cursor-default lg:cursor-pointer text-center flex-col gap-2'>
                                    <div className={`relative ${activeLink === ind ? 'border-[3px] border-slate-500' : ""}  rounded-full md:w-32 w-24 h-24 md:h-32 overflow-hidden`} >
                                        <img className='transition-transform duration-500 transform hover:scale-110' src={x.menu_image} alt="" />
                                    </div>
                                    <p className={`text-xl font-medium font-Ubuntu ${activeLink === ind && 'text-red-500'} text-gray-600`}>{x.menu_name}</p>
                                </div>
                        )
                    })
                }

            </div>
            <div className='mt-1 w-full justify-center items-center'>
                <RouteMenus />
            </div>
        
        </div>
    )
}

export default Explore


