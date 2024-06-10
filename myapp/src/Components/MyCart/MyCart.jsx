import React from 'react'
import CartHeader from '../Props/CartHeader'
import AllCards from './AllCards'

const MyCart = () => {
  const header = 'My Cart'
  return (
    <>
      <CartHeader header={header} />
      <div className='flex justify-center w-full'>
        <AllCards />
      </div>
    </>
  )
}

export default MyCart
