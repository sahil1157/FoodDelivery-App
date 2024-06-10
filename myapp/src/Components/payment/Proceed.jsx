import React from 'react'
import CartHeader from '../Props/CartHeader'
import PayOptions from './PayOptions'

const Proceed = () => {

  const header = 'Checkout'
  return (
    <>
      <CartHeader header={header} />
      <PayOptions />
    </>
  )
}

export default Proceed
