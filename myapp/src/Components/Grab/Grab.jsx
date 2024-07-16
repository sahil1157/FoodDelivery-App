import React, { useEffect } from 'react';
import resturantbg from '../../images/restaurantbgimg.jpg';
import AOS from 'aos'
import 'aos/dist/aos.css'

const Grab = () => {

    const arrays = [
        {
            name: 'Install the Gofood App on your Phone',
            img: '/GrabIcons/phone.png'
        },
        {
            name: 'Search for Foods. Filter using Types or location',
            img: '/GrabIcons/search.png'
        },
        {
            name: 'Grab your Free Deal on Gofood',
            img: '/GrabIcons/deal.png'
        },
        {
            name: 'Show Coupon to the Restaurant (Coming soon...)',
            img: '/GrabIcons/off.png'
        },
    ]

    useEffect(() => {
        AOS.init({ duration: 200 })
      }, [])

    return (
        <div data-aos='fade-up' className='w-full  h-full flex flex-col relative mt-20'>
            <div className=' md:h-[800px] h-[1000px] sm:h-[700px] lg:h-[700px]'>
                <img src={resturantbg} alt="" className='clipped-image w-full h-full' />
            </div>
            <div className='absolute px-[4%] w-full flex flex-col justify-center top-10 z-10'>
                <div className='flex  justify-center gap-2 text-center items-center h-full'>
                    <p className='font-[600] text-[20px] md:text-[28px] text-white uppercase'>Grab Free Restaurant </p>
                    <span className='md:w-28 w-24 h-[40px] md:h-[55px] border-[1px] bg-[#f7922f] items-center border-black rounded-lg flex justify-center font-[600] text-[27px]'>DEALS</span>
                </div>

                <div className='w-full mt-12 flex flex-wrap gap-8 p-6 md:justify-between justify-center lg:justify-between xl:justify-evenly items-center'>
                    {
                        arrays && arrays.map((x, ind) => {
                            return (
                                <div data-aos='fade-up' key={ind} className='flex items-center justify-center md:max-h72 md:w-60 w-52 max-h-60 h-full flex-col gap-3'>
                                    <div className='md:w-40 md:h-40 w-32 h-32 gap-2 flex items-center justify-center md:clipped-image bg-white rounded-full'>
                                        <img src={x.img} alt="" className='w-28 h-20 ' />
                                    </div>
                                    <p className='md:text-[18px] text-center text-[13px] flex-wrap font-[500] text-white'>{x.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Grab;
