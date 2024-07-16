import React, { useEffect } from 'react';
import AOS from 'aos'
import 'aos/dist/aos.css'

const Choose = () => {
    const arrays = [
        {
            name: "Find Your Daily Meal",
            icon: '/GrabIcons/Burger.png'
        },
        {
            name: "Easy to Food Ordering System",
            icon: '/GrabIcons/man.png'
        },
        {
            name: "Fastest Food Delivery Service",
            icon: '/GrabIcons/deliver.png'
        },
        {
            name: "Track Your Food Order",
            icon: '/GrabIcons/order.png'
        },
    ]
    useEffect(() => {
        AOS.init({ duration: 200 })
    }, [])
    return (
        <div className='flex mt-12 gap-12 flex-col justify-center items-center w-full'>
            <div className='flex w-full text-center flex-col gap-1'>
                <p className='text-4xl font-[700] text-[#EF0107]'>Why Choose Us</p>
                <p className='text-xl text-slate-500 font-[600]'>What's so special about Gofood</p>
            </div>
            <div data-aos='fade-up' className=' px-[5%] w-fit flex flex-col sm:grid sm:grid-cols-2 sm:w-fit md:grid md:grid-cols-2 md:w-fit lg:grid-cols-2 lg:grid lg:w-full xl:flex xl:flex-row xl:flex-wrap justify-center items-center gap-8'>
                {
                    arrays && arrays.map((x, ind) => {
                        return (
                            <div data-aos='fade-up' key={ind} className="w-full xl:w-fit max-w-[700px] h-64 relative group overflow-hidden">
                                <img
                                    src={x.icon}
                                    alt="Burger"
                                    className="w-full object-cover h-full transform transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                <div className="md:text-3xl text-xl font-[600] absolute inset-0 flex items-center text-white px-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {x.name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Choose;
