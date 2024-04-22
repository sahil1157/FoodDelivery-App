import React from 'react'
import pizza from '../../images/food.jpg'
import Search from './Search'

const Carousel1 = () => {
    return (
        <div className='relative '>
            <div className='relative items-center  opacity-100 justify-center flex'>
                <img className='w-full h-[600px] relative opacity-80 object-cover' src={pizza} alt="" />
                <Search />
            </div>
        </div>
    )
}

export default Carousel1
