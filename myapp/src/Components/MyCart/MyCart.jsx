import React from 'react'
import CartHeader from '../Props/CartHeader'
import AllCards from './AllCards'

const MyCart = () => {
  const header = 'My Cart'
  return (
    <div className=''>
      <CartHeader header={header} />
      <div className='flex justify-center w-full'>
        <AllCards />
      </div>
    </div>
  )
}

export default MyCart
