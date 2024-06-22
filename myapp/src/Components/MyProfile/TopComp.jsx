import React, { useContext } from 'react'
import { StoreContext } from '../Context/ContextApi'
import bgImg from '../../images/realImg.jpg'
import iconImg from '../../images/ProfileIcon.png'

const TopComp = ({ setLogout }) => {
    const { users } = useContext(StoreContext)

    return (
        <div className='flex flex-col w-full justify-center'>
            <div className='justify-center flex bg-red-100'>
                <div className='w-full flex justify-center'>
                    <img src={bgImg} alt="" className='w-full relative object-cover h-44 opacity-25' />
                    <div className='flex absolute'>
                        <p className='text-black text-xl font-semibold'>Profile</p>
                    </div>
                </div>
            </div>
            <div className='w-full relative flex gap-3 flex-row justify-center text-center items-center'>
                <div className='flex w-full flex-col justify-between md:justify-center md:items-center -translate-y-8 md:-translate-y-14  gap-1'>
                    <div className='w-fit items-center justify-center flex flex-col'>
                        <img src={iconImg} alt="" className='md:w-28 w-16 h-16 md:h-28 opacity-50' />
                        <div className='flex flex-row text-center gap-2 md:text-2xl text-lg font-Ubuntu'>
                            <p>{users && users.firstName}</p>
                            <span>{users && users.lastName}</span>
                        </div>
                    </div>
                </div>
                <div className='md:absolute right-0  flex items-end'>
                    <button onClick={() => setLogout(true)} className={` md:inline-block font-Ubuntu bg-white border-[1px] hover:border-red-600 border-green-500 hover:text-red-600 duration-300 text-green-500 px-4 text-lg h-10 rounded-lg`}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopComp
