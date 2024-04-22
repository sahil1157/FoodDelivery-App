import React, { useEffect } from 'react'
import sideImg from '../../images/img_with_phone.png'
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from 'aos'
import 'aos/dist/aos.css'

const About = () => {

    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    return (
        <div className='pt-12 w-full flex-col justify-between mx-auto lg:text-start text-center lg:flex-row flex'>
            <div data-aos='fade-right' className='flex flex-col pt-10 gap-2'>
                <p className='text-4xl md:text-6xl font-Ubuntu text-red-600'>Go Food</p>
                <p className='text-3xl pt-3 font-semibold'>Is the best delivery service near you</p>
                <p className='text-lg max-w-[550px] font-Ubuntu mx-auto lg:mx-0 lg:pt-2 pt-5 text-gray-500'>We make food delivery more interesting. Find the greatest deals from the restaurants near you. Tasty & healthy dishes. Bring a restaurant into your home. </p>

                <div className='pt-4 flex lg:justify-start justify-center'>
                    <button className='w-fit items-center flex flex-row gap-2 justify-between p-2 hover:bg-red-700 duration-300 bg-[#ff0000] rounded-md text-white'>
                        <p className='text-md font-Ubuntu font-light'>OrderNow</p>
                        <FaArrowRightLong size={15} />
                    </button>
                </div>
            </div>
            <div data-aos='fade-left' className='lg:justify-end lg:pt-0 pt-4 justify-center flex'>
                <img className='md:max-w-[600px]' src={sideImg} alt="" />
            </div>
        </div>

    )
}

export default About
