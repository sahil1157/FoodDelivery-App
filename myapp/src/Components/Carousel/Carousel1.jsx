import React from 'react';
import HomePagePicture from '../../images/HomepagePic.jpg';
import { useNavigate } from 'react-router-dom';

const Carousel1 = () => {
    const navigate = useNavigate();
    return (
        <div className='relative'>
            <div className='relative flex items-center justify-center'>
                {/* for smaller screens,... */}
                <img
                    className='w-full h-[600px] lg:h-full relative opacity-80 object-cover object-[center]'
                    src={HomePagePicture}
                    alt="Delicious Pizza"
                    style={{ objectPosition: window.innerWidth < 768 ? '80% center' : 'center' }}
                />
                <div style={{ paddingInline: '4%' }} className='absolute inset-0 flex flex-col justify-center text-left px-4 gap-2 md:px-8'>
                    <h1 className='text-4xl md:text-6xl font-bold text-white drop-shadow-lg'>
                        Savor the Flavor
                    </h1>
                    <p className='mt-4 text-lg md:text-2xl text-white drop-shadow-md max-w-lg'>
                        Fresh ingredients, delivered fast. Order from your favorite local spots.
                    </p>
                    <button
                        onClick={() => navigate("/menu")}
                        className='mt-8 animate-bounce w-fit px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300'>
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Carousel1;
