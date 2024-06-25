import React, { useContext, useEffect } from 'react';
import AddDelete from './AddDelete';
import { StoreContext } from '../Context/ContextApi';
import { assets } from '../assets/assets';

const BoxComp = ({ handleTotal }) => {
    const { selectItems, url } = useContext(StoreContext);
    let amount = 0;

    useEffect(() => {
        handleTotal(amount);
    }, [handleTotal, amount]);

    return (
        <>
            <div className='w-full md:max-w-[670px] overflow-scroll border-[1px] shadow-lg h-full max-h-[300px] rounded-lg'>
                <div className='flex p-2 sm:p-7 gap-3 flex-col'>
                    {
                        selectItems && selectItems.map((item, ind) => {
                            amount += item.price * item.quantity;
                            return (
                                <div key={ind} className='flex flex-col gap-4'>
                                    <div className='w-full h-fit items-center flex flex-row justify-between'>
                                        <div className='flex flex-row gap-3'>
                                            <div className='w-28 h-20'>
                                                <img className='rounded-xl w-full h-full' src={url + '/images/' + item.image} alt="" />
                                            </div>
                                            <div className='flex mt-1 gap-1 flex-col'>
                                                <p className='font-semibold'>{item.name}</p>
                                                <img className='rating w-[65px]' src={assets.rating_starts} alt="" />
                                                <p className='font-semibold text-md'>${item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                        <AddDelete item={item} className={'flex'} />
                                    </div>
                                    <hr className='border-[1px] border-gray-300' />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default BoxComp;
