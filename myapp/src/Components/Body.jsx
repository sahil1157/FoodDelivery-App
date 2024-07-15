import React, { useState } from 'react'
import Carousel1 from './Carousel/Carousel1'
import About from './About/About'
import Featured from './Features/Featured'
import Explore from './ExploreMenus/Explore'
import IndexGrab from './Grab/IndexGrab'
import IndexChoose from './WhyChooseUs/IndexChoose'

const Body = () => {
  const [activeLink, setActiveLink] = useState()

  return (
    <div className='relative overflow-hidden flex flex-col'>
      <Carousel1 />
      <div style={{ paddingInline: '8%' }} className='flex flex-col gap-4'>
        <Explore activeLink={activeLink} setActiveLink={setActiveLink} />
        <About />
        <Featured />
      </div>
      <IndexGrab />
      <IndexChoose/>
    </div>
  )
}

export default Body
