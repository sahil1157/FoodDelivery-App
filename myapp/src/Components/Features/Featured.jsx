import React, { useEffect } from 'react'
import { featuredItems } from './featuredArray'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Featured = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 })
}, [])

  return (
    <div className='flex lg:pt-3 pt-7 justify-between flex-col gap-4'>
      <div className='flex text-center font-Ubuntu flex-col gap-1'>
        <p data-aos='fade-up' className='text-4xl text-[#ff0000] font-semibold'>Stunning Features</p>
        <p data-aos='fade-up' className='text-lg font-medium text-slate-500'>Remarkable Features that you can count!</p>
      </div>
      <div data-aos='fade-up' className='flex pt-4 flex-wrap gap-8 justify-center md:justify-between md:flex-row'>
        {
          featuredItems && featuredItems.map((x, id) => {
            return (
              <>
                <div key={id} className='cursor-pointer rounded-md text-center flex flex-col justify-center items-center bg-[#ff0000] w-[280px] h-[300px]'>
                  <div>
                    <img className='w-20 justify-center flex mx-auto h-20' src={x.img} alt="" />
                    <p className='text-xl pt-4 text-white  font-bold'>{x.name}</p>
                  </div>
                  <p className='pt-4 p-5 text-sm text-white'>{x.para}</p>
                </div>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Featured