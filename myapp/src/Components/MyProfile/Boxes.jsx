import React from 'react';

const Boxes = () => {
    const boxes = [
        {
            iconImg: '/icons/ProfileIcon.png',
            desc1: 'january 2024',
            desc2: 'Since Joining',
            className:'w-10 h-10 bg-transparent'
        },
        {
            iconImg: '/icons/realDebit.png',
            desc1: 'Rs 0',
            desc2: 'Wallet Balance',
            className:'w-10 h-10 bg-transparent'
        },
        {
            iconImg: '/icons/realShop-removebg-preview.png',
            desc1: '0',
            desc2: 'Total Order',
            className:'w-16 h-10 bg-transparent'
        },
        {
            iconImg: '/icons/ratiing-removebg-preview.png',
            desc1: '0',
            desc2: 'Loyality',
            className:'w-16 h-10 bg-transparent'
        },
    ]
    return (
        <div className='flex flex-row flex-wrap w-full items-center justify-center lg:justify-between gap-12 md:gap-4'>
            {
                boxes && boxes.map((x, ind) => {
                    return (
                        <div key={ind} className='justify-center text-center items-center max-w-72 w-full h-full p-3 rounded-xl bg-white border-[2px] flex flex-col gap-2'>
                            <img src={x.iconImg} alt="" className={x.className} />
                            <p className='text-xl font-semibold'>{x.desc1}</p>
                            <p className='text-md text-gray-400 font-Ubuntu'>{x.desc2}</p>
                        </div>
                    )
                }
                )}
        </div>
    );
}

export default Boxes;


