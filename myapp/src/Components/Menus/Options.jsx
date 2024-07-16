import Aos from 'aos';
import React, { useEffect } from 'react';
import { RxCross1 } from "react-icons/rx";
import 'aos/dist/aos.css';

const Options = ({ setShowFilter }) => {

    useEffect(() => {
        Aos.init({ duration: 400 });
    }, []);

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    return (
        <div style={{paddingInline:'5%'}} className='text-black z-30 transition-transform duration-500 absolute bg-opacity-25 backdrop-blur-[2px] w-full h-screen box-border justify-center flex '>
            <div data-aos='fade-up' className=' flex justify-center items-center h-full w-full mx-auto'>
                <div className='md:w-[40vw] w-full h-fit relative flex flex-col bg-white border-2 rounded-lg'>
                    <div className='flex w-full flex-col gap-3'>
                        <div className='flex flex-col'>
                            <p className='text-2xl p-4 font-Ubuntu font-medium'>Filters</p>
                            <hr className='w-full border-gray-400' />
                        </div>
                        <div className='pt-6 flex flex-col gap-3 p-4 flex-grow'>
                            <div className='flex flex-row gap-14'>
                                <div>
                                    <p className='text-2xl font-Ubuntu font-light'>Sort by</p>
                                    <p className='text-red-500'>popularity</p>
                                </div>
                                <form className='flex flex-col gap-3' action="">
                                    <div className='flex flex-row gap-5 items-center'>
                                        <input className='w-5 h-5 text-gray-500' type="radio" name="popularity" id="" />
                                        <label className='text-lg font-light' htmlFor="">popularity</label>
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <input className='w-5 h-5 text-gray-500' type="radio" name="popularity" id="" />
                                        <label className='text-lg font-light' htmlFor="">popularity</label>
                                    </div>
                                </form>
                            </div>
                            <div className='flex  flex-row gap-14 pt-5'>
                                <div>
                                    <p className='text-2xl font-Ubuntu font-light'>Sort by</p>
                                    <p className='text-red-500'>Price</p>
                                </div>
                                <form className='flex flex-col gap-3' action="">
                                    <div className='flex gap-5 flex-row items-center'>
                                        <input className='w-5 h-5 text-gray-500' type="radio" name="price" id="" />
                                        <label className='text-lg font-light' htmlFor="">high to low</label>
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <input className='w-5 h-5 text-gray-500' type="radio" name="price" id="" />
                                        <label className='font-light text-lg' htmlFor="">low to high</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <button className='absolute flex right-5 top-4' onClick={() => setShowFilter(false)}>
                        <RxCross1 size={25} />
                    </button>
                    <div className="flex justify-end p-4">
                        <button onClick={() => setShowFilter(false)} className='text-xl items-center rounded-md bottom-3 right-3 w-28 h-11 bg-red-500 text-white hover:bg-red-600 '>
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Options;
