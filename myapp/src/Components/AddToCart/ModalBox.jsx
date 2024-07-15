import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context/ContextApi';
import { RxCross1 } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import Amount from './Amount';


const ModalBox = ({ setIsOpen, storeItem, handleCardItems }) => {
    const { url } = useContext(StoreContext);


    useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "scroll"
        }
    }, [])


    return (
        <>
            <div style={{ paddingInline: '5%' }} className="fixed top-0 left-0 flex items-center z-20 justify-center w-full h-screen backdrop-brightness-50 backdrop-blur-[2px] bg-opacity-40">
                <div className='gap-3 w-[80%] md:w-fit lg:w-[37vw] p-6 flex flex-col justify-between fle relative rounded-md border-2 shadow-2xl bg-white h-fit'>
                    <div>
                        <button onClick={() => setIsOpen(false)} className='flex  absolute right-3 top-2'>
                            <RxCross1 className='w-6 h-6 shadow-lg shadow-pink-400 rounded-full border-white border-[1px] p-1' size={15} />
                        </button>
                        <div className='sm:flex-row flex flex-col w-full gap-3'>
                            <div className='mt-10 sm:mt-0'>
                                <img className='h-44 sm:h-32 w-full md:w-56 rounded-md' src={storeItem && url + '/images/' + storeItem.image} alt="" />
                            </div>
                            <div className='flex w-full justify-between flex-row'>
                                <div className='flex pt-3 flex-col'>
                                    <p className='font-Ubuntu text-xl'>{storeItem && storeItem.name}</p>
                                    <p className='text-md font-semibold text-red-500'>Royal cloud kitchen</p>
                                    <p className='text-xl font-medium text-neutral-700'>{storeItem && storeItem.category}</p>
                                    <p className='text-xl hidden md:block font-semibold'>${storeItem && storeItem.price}</p>
                                </div>
                                <div className='cursor-pointer pt-5 mr-10'>
                                    <CiHeart size={30} className='text-gray-500 hidden md:flex' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Amount handleCardItems={handleCardItems} storeItem={storeItem} />
                </div>
            </div>
        </>
    );
};

export default ModalBox;
